import exifread
from PIL import Image
from PIL.ExifTags import TAGS
import argparse
import os
import requests
from tempfile import NamedTemporaryFile
import cv2 as cv
from serpapi import GoogleSearch
from matplotlib import pyplot as plt
from os.path import basename
import base64
from io import BytesIO
import numpy as np
import torch
from . import RRDBNet_arch as arch

seed = 42
torch.manual_seed(seed)
np.random.seed(seed)

model_path = 'algorithms/RRDB_ESRGAN_x4.pth'

model = arch.RRDBNet(3, 3, 64, 23, gc=32)
model.load_state_dict(torch.load(model_path, weights_only=True), strict=True)
model.eval()

def image_process(image_path):
    response = requests.get(image_path)
    if response.status_code != 200:
        print("Failed to download image")
        return None
    
    with NamedTemporaryFile(delete=False, suffix=".png") as temp_file:
        temp_file.write(response.content)
        temp_file_path = temp_file.name

    try:
        args = argparse.Namespace(datafile=temp_file_path)
        print(args)

        if not check_file(temp_file_path):
            print("Invalid file. Please make sure the file exists and the type is JPEG")
            return None
        
        #exif_data = exif_check(args.datafile)
        #reverse_result = reverse_image_search(image_path)
        #jpeg_ghost_result = jpeg_ghost(temp_file_path, 60)
        super_resolution_result = super_resolution(temp_file_path)
        return {
            #"exif_data": exif_data,
            #"reverse_image_search_results": reverse_result,
            #"jpeg_ghost_result": jpeg_ghost_result,
            "super_resolution_result": super_resolution_result,
        }
    finally:
        os.remove(temp_file_path)

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

    exif_data = {
        "software_modify": check_software_modify(exif_code_form),
        "modify_date": check_modify_date(exif_code_form),
        "original_date": check_original_date(exif_code_form),
        "camera_information": check_camera_information(tags),
        "gps_location": check_gps_location(exif_code_form),
        "author_copyright": check_author_copyright(exif_code_form),
        # Ensure all metadata values are strings
        "raw_metadata": {str(TAGS.get(tag, tag)): str(tags[tag]) for tag in tags if tag not in 
                         ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote')}
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
        return f"Photo has been modified since it was created. Modified: {modify_date}"
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

def check_gps_location(info):
    gps_info = get_if_exist(info, "GPSInfo")
    if not gps_info:
        return "GPS coordinates not found"

    gps_latitude = get_if_exist(gps_info, 2)
    gps_latitude_ref = get_if_exist(gps_info, 1)
    gps_longitude = get_if_exist(gps_info, 4)
    gps_longitude_ref = get_if_exist(gps_info, 3)
    if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
        lat = convert_to_degrees(gps_latitude)
        if gps_latitude_ref.upper() != "N":
            lat = -lat
        lng = convert_to_degrees(gps_longitude)
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


def reverse_image_search(image_url):
    params = {
        "engine": "google_reverse_image",
        "image_url": image_url,
        "api_key": "b945106cd612c06211da4507b158c6861c6e1059c0de67d92f0aedcd889f29ab"  # Replace with your actual SerpApi API key
    }

    print(params)

    search = GoogleSearch(params)
    results = search.get_dict()

    print(results)

    result = {
        "image_results": results.get("image_results", []),
        "inline_images": results.get("inline_images", []),
        "search_metadata": results.get("search_metadata", {}),
        "search_information": results.get("search_information", {}),
    }

    return result


def jpeg_ghost(file_path, quality=60):

    # print("Analyzing...")
    # bar = progressbar.ProgressBar(maxval=20,
    #                               widgets=[progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()])
    # bar.start()
    print(f"Processing file: {file_path}")

    img = cv.imread(file_path)
    if img is None:
        print("Failed to read image")
        return None
    img_rgb = img[:, :, ::-1]

    # # Quality of the reasaved images
    # if quality == None:
    #     quality = 60

    # Size of the block
    smoothing_b = 17


    # Get the name of the image
    base = basename(file_path)
    file_name = os.path.splitext(base)[0]
    save_file_name = file_name+"_temp.jpg"

    # Resaved the image with the new quality
    encode_param = [int(cv.IMWRITE_JPEG_QUALITY), quality]
    cv.imwrite(save_file_name, img, encode_param)

        # Load resaved image
    img_low = cv.imread(save_file_name)
    if img_low is None:
        print("Failed to read resaved image")
        return None

    # Compute the difference
    diff = cv.absdiff(img, img_low)
    diff = cv.cvtColor(diff, cv.COLOR_BGR2GRAY)

    # Apply Gaussian smoothing
    diff = cv.GaussianBlur(diff, (smoothing_b, smoothing_b), 0)

    # Plot the original and difference images
    fig, ax = plt.subplots(1, 1)
    ax.imshow(diff, cmap='gray')
    ax.axis('off')

    # Save the figure to a buffer
    buf = BytesIO()
    buf.seek(0)

    # Encode the buffer to base64
    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    # Clean up the temporary file
    os.remove(save_file_name)

    return img_base64

    # # Load resaved image
    # img_low = cv.imread(save_file_name)
    # img_low_rgb = img_low[:, :, ::-1]
    # # Compute the square different between original image and the resaved image
    # tmp = (img_rgb-img_low_rgb)**2

    # # Take the average by kernel size b
    # kernel = np.ones((smoothing_b, smoothing_b), np.float32)/(smoothing_b**2)
    # tmp = cv.filter2D(tmp, -1, kernel)
    # # Take the average of 3 channels
    # tmp = np.average(tmp, axis=-1)

    # # Shift the pixel from the center of the block to the left-top
    # tmp = tmp[int(offset):int(height-offset), int(offset):int(width-offset)]

    # # Compute the nomalized component
    # nomalized = tmp.min()/(tmp.max() - tmp.min())
    # # Nomalization
    # dst = tmp - nomalized

    # # print(dst)
    # # Plot the diffrent images
    # plt.subplot(1, 2, 2), plt.imshow(dst), plt.title(
    #     "Analysis. Quality = " + str(quality))
    # plt.xticks([]), plt.yticks([])

    # print("Done")
    # plt.suptitle('Exposing digital forgeries by JPEG Ghost')
    # plt.show()
    # os.remove(save_file_name)

def super_resolution(file_path):
    img = cv.imread(file_path, cv.IMREAD_COLOR)
    img = img * 1.0 / 255  # This is necessary for model input
    img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
    img_LR = img.unsqueeze(0)
    print(img_LR.device)

    with torch.no_grad():
        output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()
    output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
    print(output.shape)

    
    # Encode the super-resolved image to base64
    _, buffer = cv.imencode('.jpg', output)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    cv.imshow('Output', output)
    cv.waitKey(0)
    cv.destroyAllWindows()

    return img_base64