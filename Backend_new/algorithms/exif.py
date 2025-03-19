from PIL import Image
import piexif
import io

def extract_pure_exif(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        exif_data = piexif.load(image.info.get("exif", b""))
        return exif_data if exif_data else None
    except Exception:
        return None

def exif_check(image_bytes):
    exif_data = extract_pure_exif(image_bytes)
    if not exif_data:
        return {"error": "No EXIF data found or EXIF was stripped."}
    
    result = {}
    if "0th" in exif_data:
        result.update({
            "Software": exif_data["0th"].get(piexif.ImageIFD.Software, "Unknown"),
            "ModifyDate": exif_data["0th"].get(piexif.ImageIFD.DateTime, "Unknown"),
        })
    if "Exif" in exif_data:
        result.update({
            "OriginalDate": exif_data["Exif"].get(piexif.ExifIFD.DateTimeOriginal, "Unknown"),
            "CameraModel": exif_data["Exif"].get(piexif.ExifIFD.BodySerialNumber, "Unknown"),
        })
    if "GPS" in exif_data:
        result["GPS"] = exif_data["GPS"] if exif_data["GPS"] else "No GPS data"
    
    return result
