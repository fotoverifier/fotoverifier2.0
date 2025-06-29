import cv2
import numpy as np
from io import BytesIO
from algorithms.utility import upload_to_cloudinary

def denoising(image_bytes):
    if isinstance(image_bytes, BytesIO):
        image_bytes = image_bytes.getvalue()

    # Decode image from bytes into BGR format
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    bgr = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    if bgr is None:
        return {"denoise_error": "Failed to decode image."}

    # Convert BGR to RGB
    img_rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

    denoised_nlm = cv2.fastNlMeansDenoisingColored(
        img_rgb, None,
        h=10,           # luminance filter strength
        hColor=10,      # color filter strength
        templateWindowSize=7,
        searchWindowSize=21
    )

    denoised_bilateral = cv2.bilateralFilter(
        img_rgb, d=9,
        sigmaColor=75,
        sigmaSpace=75
    )
    # Convert RGB to BGR for OpenCV
    nlm_bgr = cv2.cvtColor(denoised_nlm, cv2.COLOR_RGB2BGR)
    bilateral_bgr = cv2.cvtColor(denoised_bilateral, cv2.COLOR_RGB2BGR)

    # Encode to PNG
    _, nlm_png = cv2.imencode('.png', nlm_bgr)
    _, bilateral_png = cv2.imencode('.png', bilateral_bgr)

    # Upload to Cloudinary
    nlm_url = upload_to_cloudinary(
        nlm_png.tobytes(),
        filename="denoised_nlm_result"
    )
    bilateral_url = upload_to_cloudinary(
        bilateral_png.tobytes(),
        filename="denoised_bilateral_result"
    )

    return {
        "nlm_url": nlm_url,
        "bilateral_url": bilateral_url
    }