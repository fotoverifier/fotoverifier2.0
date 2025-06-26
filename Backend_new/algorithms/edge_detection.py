import cv2
import numpy as np
from io import BytesIO
import base64
from algorithms.utility import upload_to_cloudinary

def edge_detection(image_bytes):
    if isinstance(image_bytes, BytesIO):
        image_bytes = image_bytes.getvalue()
        
    # Decode image from bytes into BGR format
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    f = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if f is None:
        return {"error": "Failed to decode image."}

    # Convert to grayscale
    gray_image = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)

    # Canny Edge Detection
    canny_e = cv2.Canny(gray_image, 100, 150)

    # Marr-Hildreth (Laplacian of Gaussian)
    laplacian = cv2.Laplacian(gray_image, cv2.CV_64F)
    marr_hildreth_e = cv2.convertScaleAbs(np.absolute(laplacian))

    # Encode to PNG
    _, canny_png = cv2.imencode('.png', canny_e)
    _, marr_hildreth_png = cv2.imencode('.png', marr_hildreth_e)


    # Convert PNG bytes to base64 strings
    canny_base64 = base64.b64encode(canny_png.tobytes()).decode('utf-8')
    marr_base64 = base64.b64encode(marr_hildreth_png.tobytes()).decode('utf-8')

    return {
        "canny_edge_base64": canny_base64,
        "marr_hildreth_edge_base64": marr_base64,
    }
