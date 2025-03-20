from PIL import Image
from PIL.ExifTags import TAGS
import exifread
import io
from serpapi import GoogleSearch
import os
from dotenv import load_dotenv

load_dotenv()

serpapi_secret_key = os.getenv("SERPAPI")
if not serpapi_secret_key:
    raise ValueError("SERPAPI is not set! Check your .env file.")


def exif_check(image_bytes):
    image_file = io.BytesIO(image_bytes)
    tags = exifread.process_file(image_file, details=False)
    exif__code_form = extract_pure_exif(image_bytes)
    
    if exif__code_form is None:
        print("The EXIF data has been stripped. Photo may be taken from Facebook, Twitter, Imgur")
        return {"error": "The EXIF data has been stripped. Photo may be taken from Facebook, Twitter, Imgur"}

    raw_metadata = {str(TAGS.get(tag, tag)): str(tags[tag]) for tag in tags if tag not in 
                    ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote')}

    exif_result = {
        "software_modify": check_software_modify(exif__code_form),
        "modify_date": check_modify_date(exif__code_form),
        "original_date": check_original_date(exif__code_form),
        "camera_information": check_camera_information(exif__code_form),
        "gps_location": check_gps_location(raw_metadata),
        "author_copyright": check_author_copyright(exif__code_form),
        "raw_metadata": raw_metadata
    }
    
    return exif_result


def extract_pure_exif(image_bytes):
    image_file = io.BytesIO(image_bytes)
    img = Image.open(image_file)
    info = img._getexif()
    if info:
        # Convert the raw EXIF data to a dictionary with human-readable tag names and ensure all values are strings
        return {TAGS.get(tag, tag): convert_exif_value(info[tag]) for tag in info}
    return None


def convert_exif_value(value):
    """ Convert EXIF values to JSON-serializable types. """
    if isinstance(value, bytes):
        try:
            return value.decode()
        except UnicodeDecodeError:
            return str(value)
    elif isinstance(value, tuple):
        return [convert_exif_value(v) for v in value]
    else:
        return str(value)


def check_software_modify(info):
    software = get_if_exist(info, "Software")
    return f"Image edited with: {software}" if software else None


def check_modify_date(info):
    return "Photo has been modified since it was created." if get_if_exist(info, "DateTime") else None


def check_original_date(info):
    return {
        "original_date": get_if_exist(info, "DateTimeOriginal"),
        "create_date": get_if_exist(info, "DateTimeDigitized")
    }


def check_camera_information(info):
    return {
        "make": str(get_if_exist(info, "Make")),
        "model": str(get_if_exist(info, "Model")),
        "exposure": str(get_if_exist(info, "ExposureTime")),
        "aperture": str(get_if_exist(info, "ApertureValue")),
        "focal_length": str(get_if_exist(info, "FocalLength")),
        "iso_speed": str(get_if_exist(info, "ISOSpeedRatings")),
        "flash": str(get_if_exist(info, "Flash")),
        "camera_image": image_search(str(get_if_exist(info, 'Image Make')))
    }


def check_gps_location(raw_metadata):
    gps_latitude = raw_metadata.get("GPS GPSLatitude")
    gps_latitude_ref = raw_metadata.get("GPS GPSLatitudeRef")
    gps_longitude = raw_metadata.get("GPS GPSLongitude")
    gps_longitude_ref = raw_metadata.get("GPS GPSLongitudeRef")

    if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
        lat = convert_to_degrees(eval(gps_latitude))
        if gps_latitude_ref.upper() != "N":
            lat = -lat
        lng = convert_to_degrees(eval(gps_longitude))
        if gps_longitude_ref.upper() != "E":
            lng = -lng
        return {"latitude": lat, "longitude": lng}

    return None


def convert_to_degrees(value):
    try:
        d, m, s = map(float, value)
        return d + (m / 60.0) + (s / 3600.0)
    except (TypeError, ValueError, IndexError):
        return None


def check_author_copyright(info):
    return {
        "author": get_if_exist(info, "XPAuthor"),
        "copyright_tag": get_if_exist(info, "Copyright"),
        "profile_copyright": get_if_exist(info, "ProfileCopyright"),
        "author_image": image_search(get_if_exist(info, "XPAuthor"))
    }


def get_if_exist(data, key):
    return data.get(key) if isinstance(data, dict) else None

def image_search(model):
    params = {
        "engine": "google_images",
        "q": f"{model}",
        "api_key": serpapi_secret_key
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    
    result = {
        "image_results": results.get("images_results", []),
    }
    return result