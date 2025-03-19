import cv2
import base64
import numpy as np
from io import BytesIO
import cloudinary.uploader
from .utility import create_lut

def ela(image_bytes, quality=75, scale=50, contrast=20):
    contrast = int(contrast / 100 * 128)
    
    if isinstance(image_bytes, BytesIO):
        image_bytes = image_bytes.getvalue()  # Extract raw bytes
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    original = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    
    if original is None:
        print("Failed to decode image")
        return {"ela_error": "Failed to decode image. Ensure it's a valid format."}
    
    _, buffer = cv2.imencode(".jpg", original, [cv2.IMWRITE_JPEG_QUALITY, quality])
    compressed = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
    
    if compressed is None:
        return {"ela_error": "Failed to recompress image"}
    
    original = original.astype(np.float32) / 255
    difference = cv2.absdiff(original, compressed.astype(np.float32) / 255)
    
    ela = cv2.convertScaleAbs(cv2.sqrt(difference) * 255, None, scale / 20)
    ela = cv2.LUT(ela, create_lut(contrast, contrast))

    # Encode processed ELA image as base64
    _, buffer = cv2.imencode('.png', ela)
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return img_base64
        
    
