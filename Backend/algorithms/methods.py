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

load_dotenv()

seed = 42
torch.manual_seed(seed)
np.random.seed(seed)
# device = torch.device('cpu')
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')



def image_process(image_path):
    # response = requests.get(image_path)
    # if response.status_code != 200:
    #     print("Failed to download image")
    #     return None
    
    # with NamedTemporaryFile(delete=False) as temp_file:
    #     temp_file.write(response.content)
    #     temp_file_path = temp_file.name


    args = argparse.Namespace(datafile=image_path)

    if not check_file(image_path):
        print("Invalid file. Please make sure the file exists and the type is JPEG or PNG")
        return None
    
    exif_data = exif_check(args.datafile)
    reverse_result = reverse_image_search(image_path)
    jpeg_ghost_result = jpeg_ghost(image_path, 60)
    super_resolution_result = super_resolution(image_path)
    return {
        "exif_data": exif_data,
        "reverse_image_search_results": reverse_result,
        "jpeg_ghost_result": jpeg_ghost_result,
        "super_resolution_result": super_resolution_result,
    }

def check_file(data_path):
    if not os.path.isfile(data_path):
        return False
    if not data_path.lower().endswith(('.jpg', '.jpeg', 'png')):
        return False
    return True

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
        "flash": str(get_if_exist(tags, 'EXIF Flash'))
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
    return {
        "author": author,
        "copyright_tag": copyright_tag,
        "profile_copyright": profile_copyright
    }


def reverse_image_search(image_path):
    import cloudinary.uploader
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
        "search_metadata": results.get("search_metadata", {}),
        "search_information": results.get("search_information", {}),
    }

    return result


def jpeg_ghost(file_path, quality=60):
    print(f"Processing file: {file_path}")

    # Read the original image
    img = cv2.imread(file_path)
    if img is None:
        print("Failed to read image")
        return None
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Resave the image with the new quality
    base = os.path.basename(file_path)
    file_name = os.path.splitext(base)[0]
    save_file_name = file_name + "_temp.jpg"
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    cv2.imwrite(save_file_name, img, encode_param)

    # Load the recompressed image
    img_low = cv2.imread(save_file_name)
    if img_low is None:
        print("Failed to read resaved image")
        return None
    img_low_gray = cv2.cvtColor(img_low, cv2.COLOR_BGR2GRAY)

    # Block-wise DCT comparison
    block_size = 8  # Typical JPEG block size
    height, width = img_gray.shape
    dct_diff = np.zeros_like(img_gray, dtype=np.float32)

    for i in range(0, height, block_size):
        for j in range(0, width, block_size):
            # Extract 8x8 blocks from both images
            block_original = img_gray[i:i+block_size, j:j+block_size]
            block_low = img_low_gray[i:i+block_size, j:j+block_size]

            # Compute DCT of the blocks
            dct_original = cv2.dct(np.float32(block_original))
            dct_low = cv2.dct(np.float32(block_low))

            # Compute the difference in DCT coefficients
            dct_diff[i:i+block_size, j:j+block_size] = np.abs(dct_original - dct_low)

    # Normalize the DCT difference map
    dct_diff_normalized = cv2.normalize(dct_diff, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    _, thresholded_diff = cv2.threshold(dct_diff_normalized, 100, 255, cv2.THRESH_BINARY)
    
    # Calculate the fraction of modified area
    modified_area = np.count_nonzero(thresholded_diff)
    total_area = height * width
    fraction_modified = modified_area / total_area
    print(f"Fraction of modified area: {fraction_modified:.4f}")
    
    # Apply Gaussian smoothing to reduce blockiness
    smoothed_diff = cv2.GaussianBlur(thresholded_diff, (15, 15), 0)
    
    # Optional: Upscale the smoothed difference map for better visualization
    upscale_size = (width, height)  # Match original image size
    heatmap = cv2.resize(smoothed_diff, upscale_size, interpolation=cv2.INTER_LINEAR)
    
    # Create a custom colormap with red for high values
    colors = [(0, 0, 1), (1, 0, 0)]  # Blue to Red
    n_bins = 100  # Number of bins in the colormap
    custom_cmap = LinearSegmentedColormap.from_list("blue_red", colors, N=n_bins)

    # Visualization
    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB), alpha=0.8)  # Overlay original image
    plt.imshow(heatmap, cmap=custom_cmap, alpha=0.8)  # Heatmap overlay
    plt.axis("off")
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)

    # Save the figure to a buffer
    buf = BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0)
    buf.seek(0)

    # Encode the buffer to base64
    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    # Clean up the temporary file
    os.remove(save_file_name)

    return img_base64, fraction_modified

def super_resolution(file_path):
    model_path = 'algorithms/RRDB_ESRGAN_x4.pth'

    model = arch.RRDBNet(3, 3, 64, 23, gc=32)
    model.load_state_dict(torch.load(model_path, weights_only=True), strict=True)
    model.eval()
    
    img = cv2.imread(file_path, cv2.IMREAD_COLOR)
    img = img * 1.0 / 255
    img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
    img_LR = img.unsqueeze(0)

    with torch.no_grad():
        output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()
    output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
    
    # Encode the super-resolved image to base64
    _, buffer = cv2.imencode('.jpg', output)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    return img_base64

def recognize_objects(file_path):
    try:
        model = ram_plus(pretrained="algorithms/ram_plus_swin_large_14m.pth", vit='swin_l', image_size=384)
        model.eval()
        model.to(device)

        # Transform the image
        transform = get_transform(image_size=384)
        image = transform(Image.open(file_path)).unsqueeze(0).to(device)

        # Perform inference
        with torch.no_grad():
            res = inference(image, model)

        print("Image Tags: ", res[0])
        return res[0]

    except Exception as e:
        print(f"Error in recognize_objects: {e}")
        return None

def fake_image_detect(file_path):
    resaved_filename = file_path.split('.')[0] + '.resaved.jpg'
    
    im = Image.open(file_path).convert('RGB')
    im.save(resaved_filename, 'JPEG', quality=90)
    resaved_im = Image.open(resaved_filename)
    
    ela_im = ImageChops.difference(im, resaved_im)
    
    extrema = ela_im.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
    scale = 255.0 / max_diff
    
    ela_im = ImageEnhance.Brightness(ela_im).enhance(scale)
    
    buffered = BytesIO()
    ela_im.save(buffered, format='png')
    buffered.seek(0)
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    os.remove(resaved_filename)

    
    return img_base64

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Image processing")
    parser.add_argument("datafile", help="Path to the image file")
    args = parser.parse_args()
    exif_check(args.datafile)