import cv2
import base64
import numpy as np
from .utility import create_lut

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