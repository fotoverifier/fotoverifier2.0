from PIL import Image
from PIL.ExifTags import TAGS
import exifread
import io
import os
from dotenv import load_dotenv
from duckduckgo_search import DDGS
from serpapi import GoogleSearch

load_dotenv()

serpapi_secret_key = os.getenv("SERPAPI_SECRET_KEY")


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
    model = get_if_exist(info, "Model")
    print(f"Extracted Camera Model before image_search: {model}")  # Debugging
    if model is None:
        print("Model is None before calling image_search!")
    return {
        "make": str(get_if_exist(info, "Make")),
        "model": str(get_if_exist(info, "Model")),
        "exposure": str(get_if_exist(info, "ExposureTime")),
        "aperture": str(get_if_exist(info, "ApertureValue")),
        "focal_length": str(get_if_exist(info, "FocalLength")),
        "iso_speed": str(get_if_exist(info, "ISOSpeedRatings")),
        "flash": str(get_if_exist(info, "Flash")),
        "camera_image": image_search(str(get_if_exist(info, "Model")))
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
    if not model:
        return {"error": "Query is empty"}
    try:
        # Use DuckDuckGo to search for images
        results = DDGS().images(keywords=model, region="wt-wt", safesearch="off", max_results=1)
        
        if results and len(results) > 0:
            return {"image_url": results[0]["image"]}
        else:
            return {"error": "No image results found"}
    
    except Exception as e:
        ddg_error = f"DuckDuckGo search failed: {str(e)}"
    
    if serpapi_secret_key is None:
        return {"error": f"{ddg_error}. No SerpAPI key provided for fallback."}
    
    try:
        params = {
            "engine": "google_images_light",
            "q": model,
            "api_key": serpapi_secret_key,
            "num": 1
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        images = results.get("images_results")
        if images and len(images) > 0:
            return {"image_url": images[0]["thumbnail"]}
        else:
            return {"error": f"{ddg_error}. SerpAPI also returned no results."}
    
    except Exception as e:
        return {"error": f"{ddg_error}. SerpAPI fallback failed: {str(e)}"}