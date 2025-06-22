from algorithms.utility import upload_to_cloudinary
import colour
import numpy as np
import cv2
from io import BytesIO
from colour_demosaicing import (
    demosaicing_CFA_Bayer_Malvar2004,
    demosaicing_CFA_Bayer_Menon2007,
    mosaicing_CFA_Bayer)

def process_demosaicing(image_bytes):
    if isinstance(image_bytes, BytesIO):
        image_bytes = image_bytes.getvalue()
        
    # Decode the image from bytes
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    bgr = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    
    if bgr is None:
        return {"demosaic_error": "Failed to decode image."}


    # Convert from BGR to RGB and normalize to [0, 1]
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0

    # Apply Bayer mosaicing
    cfa = mosaicing_CFA_Bayer(rgb)

    # Apply demosaicing algorithms
    malvar = demosaicing_CFA_Bayer_Malvar2004(cfa)
    menon = demosaicing_CFA_Bayer_Menon2007(cfa)
    
    # Apply sRGB encoding (gamma correction)
    malvar_encoded = colour.cctf_encoding(malvar)
    menon_encoded = colour.cctf_encoding(menon)

    # Convert back to uint8 RGB images
    malvar_img = (np.clip(malvar_encoded, 0, 1) * 255).astype(np.uint8)
    menon_img = (np.clip(menon_encoded, 0, 1) * 255).astype(np.uint8)

    # Convert to BGR for OpenCV PNG encoding
    malvar_bgr = cv2.cvtColor(malvar_img, cv2.COLOR_RGB2BGR)
    menon_bgr = cv2.cvtColor(menon_img, cv2.COLOR_RGB2BGR)

    # Encode as PNG
    _, malvar_png = cv2.imencode('.png', malvar_bgr)
    _, menon_png = cv2.imencode('.png', menon_bgr)

    # Upload to Cloudinary
    malvar_url = upload_to_cloudinary(malvar_png.tobytes(), filename="demosaic_malvar")
    menon_url = upload_to_cloudinary(menon_png.tobytes(), filename="demosaic_menon")

    return {
        "malvar_url": malvar_url,
        "menon_url": menon_url,
    }