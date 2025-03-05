import exifread
from PIL import Image, ImageChops, ImageEnhance
from PIL.ExifTags import TAGS
import argparse
import os
import cv2
from serpapi import GoogleSearch
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from os.path import basename
import base64
from io import BytesIO
import numpy as np
import torch
from . import RRDBNet_arch as arch
import argparse
from ram.models import ram_plus
from ram import inference_ram as inference
from ram import get_transform
from dotenv import load_dotenv
import os
import math
from .utility import create_lut
import cloudinary.uploader

load_dotenv()

# Global variables for model caches
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
super_res_model = None  # Cache for the super-resolution model
object_recognition_model = None  # Cache for the object recognition model

# Initialize the Super-Resolution Model
def initialize_super_res_model():
    """Initialize and cache the super-resolution model"""
    global super_res_model
    if super_res_model is None:
        super_res_model = arch.RRDBNet(3, 3, 64, 23, gc=32)
        model_path = 'algorithms/RRDB_ESRGAN_x4.pth'
        super_res_model.load_state_dict(torch.load(model_path, weights_only=True), strict=True)
        super_res_model.eval().to(device)
    return super_res_model

# Initialize the Object Recognition Model
def initialize_object_recognition_model():
    """Initialize and cache the object recognition model"""
    global object_recognition_model
    if object_recognition_model is None:
        object_recognition_model = ram_plus(pretrained="algorithms/ram_plus_swin_large_14m.pth", vit='swin_l', image_size=384)
        object_recognition_model.eval().to(device)
    return object_recognition_model

def check_file(data_path):
    """Check if the file exists and is a valid image type"""
    return os.path.isfile(data_path) and data_path.lower().endswith(('.jpg', '.jpeg', 'png'))

def exif_check(file_path):
    with open(file_path, 'rb') as f:
        tags = exifread.process_file(f, details=False)

    exif_code_form = extract_pure_exif(file_path)
    if exif_code_form is None:
        print("The EXIF data has been stripped. Photo may be taken from Facebook, Twitter, Imgur")
        return None
    
    raw_metadata = {str(TAGS.get(tag, tag)): str(tags[tag]) for tag in tags if tag not in 
                         ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote')}

    exif_data = {
        "software_modify": check_software_modify(exif_code_form),
        "modify_date": check_modify_date(exif_code_form),
        "original_date": check_original_date(exif_code_form),
        "camera_information": check_camera_information(tags),
        "gps_location": check_gps_location(raw_metadata),
        "author_copyright": check_author_copyright(exif_code_form),
        "raw_metadata": raw_metadata
        
    }
    

    return exif_data

def extract_pure_exif(file_name):
    img = Image.open(file_name)
    info = img._getexif()
    if info:
        # Convert the raw EXIF data to a dictionary with human-readable tag names and ensure all values are strings
        return {TAGS.get(tag, tag): convert_exif_value(info[tag]) for tag in info}
    return None

def convert_exif_value(value):
    """
    Convert EXIF values to strings or other JSON-serializable types.
    """
    if isinstance(value, bytes):
        try:
            return value.decode()
        except UnicodeDecodeError:
            return str(value)
    elif isinstance(value, tuple):
        return [convert_exif_value(v) for v in value]
    else:
        return str(value)

def get_if_exist(data, key):
    # Ensure data is a dictionary before attempting to access it
    if isinstance(data, dict):
        return data.get(key)
    return None  # Return None if data is not a dictionary

def check_software_modify(info):
    # Use string keys based on TAGS mapping
    software = get_if_exist(info, "Software")
    if software:
        return f"Image edited with: {software}"
    return None

def check_modify_date(info):
    modify_date = get_if_exist(info, "DateTime")
    if modify_date:
        return f"Photo has been modified since it was created."
    return None

def check_original_date(info):
    original_date = get_if_exist(info, "DateTimeOriginal")
    create_date = get_if_exist(info, "DateTimeDigitized")
    return {
        "original_date": original_date,
        "create_date": create_date
    }

def check_camera_information(tags):
    """
    Convert all IfdTag objects to strings to ensure JSON serialization.
    """
    return {
        "make": str(get_if_exist(tags, 'Image Make')),
        "model": str(get_if_exist(tags, 'Image Model')),
        "exposure": str(get_if_exist(tags, 'EXIF ExposureTime')),
        "aperture": str(get_if_exist(tags, 'EXIF ApertureValue')),
        "focal_length": str(get_if_exist(tags, 'EXIF FocalLength')),
        "iso_speed": str(get_if_exist(tags, 'EXIF ISOSpeedRatings')),
        "flash": str(get_if_exist(tags, 'EXIF Flash')),
        "camera_image": image_search(str(get_if_exist(tags, 'Image Make')))
    }

def check_gps_location(raw_metadata):
    gps_latitude = raw_metadata.get("GPS GPSLatitude")
    gps_latitude_ref = raw_metadata.get("GPS GPSLatitudeRef")
    gps_longitude = raw_metadata.get("GPS GPSLongitude")
    gps_longitude_ref = raw_metadata.get("GPS GPSLongitudeRef")

    if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
        # Convert the GPS latitude and longitude to degrees
        lat = convert_to_degrees(eval(gps_latitude))  # Safely evaluate the string as a list
        if gps_latitude_ref.upper() != "N":
            lat = -lat
        lng = convert_to_degrees(eval(gps_longitude))  # Safely evaluate the string as a list
        if gps_longitude_ref.upper() != "E":
            lng = -lng

        return {"latitude": lat, "longitude": lng}

    return None


def convert_to_degrees(value):
    """
    Helper function to convert GPS coordinates to degrees in float.
    """
    try:
        d = float(value[0])
        m = float(value[1])
        s = float(value[2])
        return d + (m / 60.0) + (s / 3600.0)
    except (TypeError, ValueError, IndexError):
        return None

def check_author_copyright(info):
    # Use string keys based on TAGS mapping
    author = get_if_exist(info, "XPAuthor")
    copyright_tag = get_if_exist(info, "Copyright")
    profile_copyright = get_if_exist(info, "ProfileCopyright")
    author_image = image_search(author)
    return {
        "author": author,
        "copyright_tag": copyright_tag,
        "profile_copyright": profile_copyright,
        "author_image": author_image
    }

def image_search(model):
    params = {
        "engine": "google_images",
        "q": f"{model}",
        "api_key": os.environ.get('SERPAPI_SECRET_KEY')
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    
    result = {
        "image_results": results.get("images_results", []),
    }
    return result


def reverse_image_search(image_path):
    
    image_url = cloudinary.uploader.upload(image_path)["secure_url"]
    params = {
        "engine": "google_reverse_image",
        "image_url": image_url,
        "api_key": os.environ.get('SERPAPI_SECRET_KEY')
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    result = {
        "image_results": results.get("image_results", []),
    }

    return result


def jpeg_ghost(file_path):
    Qmin = 20  # Minimum JPEG quality factor
    Qmax = 90  # Maximum JPEG quality factor
    Qstep = 10  # Step size for quality factor
    shift_x = 0  # Horizontal shift for ghosting
    shift_y = 0  # Vertical shift for ghosting
    print(f"Processing file: {file_path}")

    # Read the original image
    original = np.double(cv2.imread(file_path))
    if original is None:
        print("Failed to read image")
        return None

    ydim, xdim, zdim = original.shape

    # Construct ghostmaps with possible shift
    nQ = int((Qmax - Qmin) / Qstep) + 1

    ghostmap = np.zeros((ydim, xdim, nQ))
    for i, quality in enumerate(range(Qmin, Qmax + 1, Qstep)):
        # Shift the image
        shifted_original = np.roll(original, shift_x, axis=1)
        shifted_original = np.roll(shifted_original, shift_y, axis=0)
        
        # Recompress the shifted image
        tempvar1 = cv2.imencode(".jpg", shifted_original, [int(cv2.IMWRITE_JPEG_QUALITY), quality])[1].tobytes()
        tempcar2 = np.frombuffer(tempvar1, np.byte)
        tmpResave = np.double(cv2.imdecode(tempcar2, cv2.IMREAD_ANYCOLOR))

        # Compute difference and average over RGB
        for z in range(zdim):
            ghostmap[:, :, i] += np.square(shifted_original[:, :, z].astype(np.double) - tmpResave[:, :, z])
        ghostmap[:, :, i] /= zdim
        
    # Compute average over larger area
    averagingBlock = 16
    blkE = np.zeros((int((ydim) / averagingBlock), int((xdim) / averagingBlock), nQ))
    for c in range(nQ):
        cy = 0
        for y in range(0, ydim - averagingBlock, averagingBlock):
            cx = 0
            for x in range(0, xdim - averagingBlock, averagingBlock):
                bE = ghostmap[y : y + averagingBlock, x : x + averagingBlock, c]
                blkE[cy, cx, c] = np.mean(bE)
                cx += 1
            cy += 1

    # Normalize difference
    minval = np.min(blkE, axis=2)
    maxval = np.max(blkE, axis=2)
    for c in range(nQ):
        blkE[:, :, c] = (blkE[:, :, c] - minval) / (maxval - minval)
        
    image_urls = []

    for c in range(nQ):
        quality = Qmin + c * Qstep
        if 30 <= quality <= 80:
            # Create a new figure for quality level from 30 to 80
            plt.figure(figsize=(xdim / 100, ydim / 100))
            plt.imshow(blkE[:, :, c], cmap="gray", vmin=0, vmax=1)
            plt.axis("off")
            plt.draw()
            
            image_filename = f"jpeg_ghost_quality_{quality}.png"
            image_path = os.path.join("media", image_filename)
            plt.savefig(image_path, format="png", dpi=200)
            plt.close()

            upload_result = cloudinary.uploader.upload(image_path)
            image_url = upload_result["secure_url"]
            image_urls.append(image_url)
    
    # ghost_img = compute_jpeg_ghost_gimp(original)
    
    # ghost_image_filename = "jpeg_ghost_gimp_style.png"
    # ghost_image_path = os.path.join("media", ghost_image_filename)
    # cv2.imwrite(ghost_image_path, ghost_img)

    # upload_result = cloudinary.uploader.upload(ghost_image_path)
    # image_urls.append(upload_result["secure_url"])  # Append 7th image URL

    return image_urls

# def compute_jpeg_ghost_gimp(original):
#     """Generate JPEG Ghost image using a technique similar to GIMP"""
#     quality = 80  # Set to a mid-range quality factor

#     # Save and reload at lower quality
#     tempvar1 = cv2.imencode(".jpg", original, [int(cv2.IMWRITE_JPEG_QUALITY), quality])[1].tobytes()
#     tempcar2 = np.frombuffer(tempvar1, np.byte)
#     lower_quality = cv2.imdecode(tempcar2, cv2.IMREAD_ANYCOLOR).astype(np.float64)

#     # Compute difference
#     diff = np.abs(original - lower_quality)
    
#     # Normalize to range 0-255
#     diff = (diff - diff.min()) / (diff.max() - diff.min()) * 255
#     diff = diff.astype(np.uint8)

#     # Apply heatmap-like visualization
#     heatmap = cv2.applyColorMap(diff, cv2.COLORMAP_JET)

#     return heatmap


def super_resolution(file_path):
    """Apply super resolution to an image using a pre-trained model"""
    model = initialize_super_res_model()
    img = cv2.imread(file_path)
    img = img * 1.0 / 255
    img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
    img_LR = img.unsqueeze(0)

    with torch.no_grad():
        output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()

    output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
    _, buffer = cv2.imencode('.jpg', output)
    return base64.b64encode(buffer).decode('utf-8')

def recognize_objects(file_path):
    """Recognize objects in the image using a pre-trained model"""
    try:
        model = initialize_object_recognition_model()
        transform = get_transform(image_size=384)
        image = transform(Image.open(file_path)).unsqueeze(0).to(device)

        with torch.no_grad():
            res = inference(image, model)

        return res[0]
    except Exception as e:
        print(f"Error in recognize_objects: {e}")
        return None

def ela(file_path, quality=75, scale=50, contrast=20):
    contrast = int(contrast / 100 * 128)
    
    original = cv2.imread(file_path)
    if original is None:
        print("Failed to read image")
        return None
    
    _, buffer = cv2.imencode(".jpg", original, [cv2.IMWRITE_JPEG_QUALITY, quality])
    compressed = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
    original = original.astype(np.float32) / 255
    difference = cv2.absdiff(original, compressed.astype(np.float32) / 255)
    ela = cv2.convertScaleAbs(cv2.sqrt(difference) * 255, None, scale / 20)
    ela = cv2.LUT(ela, create_lut(contrast, contrast))

    # height, width = ela.shape[:2]
    # new_dim = (int(width * 0.25), int(height * 0.25))
    # ela = cv2.resize(ela, new_dim, interpolation=cv2.INTER_AREA)
    
    _,buffer = cv2.imencode('.png', ela)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    return img_base64

# Example usage
if __name__ == "__main__":
    result = jpeg_ghost("./sample/demo4.jpg")
    if result is not None:
        img_arr = np.frombuffer(result.getvalue(), dtype=np.uint8)
        img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)
        cv2.imshow("JPEG Result", img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()