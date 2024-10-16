import exifread
from PIL import Image
from PIL.ExifTags import TAGS
import argparse
import os
import requests
from tempfile import NamedTemporaryFile

def image_process(image_path):
    response = requests.get(image_path)
    if response.status_code != 200:
        print("Failed to download image")
        return None
    
    with NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(response.content)
        temp_file_path = temp_file.name

    try:
        args = argparse.Namespace(datafile=temp_file_path)
        print(args)

        if not check_file(temp_file_path):
            print("Invalid file. Please make sure the file exists and the type is JPEG")
            return None
        
        exif_data = exif_check(args.datafile)
        return exif_data
    finally:
        os.remove(temp_file_path)

def check_file(data_path):
    if not os.path.isfile(data_path):
        return False
    if not data_path.lower().endswith(('.jpg', '.jpeg')):
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
