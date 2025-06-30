import cv2 as cv
import numpy as np
import cloudinary
import cloudinary.uploader
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import os
from dotenv import load_dotenv
import logging
from threading import Lock
from io import BytesIO
from PIL import Image

# Configure logging to ensure INFO and ERROR logs are captured
logging.basicConfig(level=logging.INFO, format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')
logger = logging.getLogger(__name__)

load_dotenv()

# Create a custom requests session
session = requests.Session()
adapter = HTTPAdapter(
    pool_connections=5,
    pool_maxsize=10,
    max_retries=Retry(total=3, backoff_factor=0.1, status_forcelist=[500, 502, 503, 504])
)
session.mount('https://', adapter)
session.mount('http://', adapter)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET"),
    secure=True
)

# Patch Cloudinary's HTTP client
cloudinary.http_client = session

# Create a lock for thread-safe uploads
upload_lock = Lock()

MAX_CLOUDINARY_SIZE = 10 * 1024 * 1024  # 10MB

def ensure_jpeg_under_limit(image_bytes: bytes, target_size=MAX_CLOUDINARY_SIZE) -> bytes:
    """
    Returns the original bytes if already <= target_size.
    Otherwise converts to JPEG and reduces quality until under target_size.
    """
    if len(image_bytes) <= target_size:
        return image_bytes

    # Needs compression
    img = Image.open(BytesIO(image_bytes))

    # Convert to RGB (JPEG doesn't support alpha)
    if img.mode in ("RGBA", "LA"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1])
        img = background
    else:
        img = img.convert("RGB")

    # Start with high quality, reduce if needed
    quality = 90
    min_quality = 40

    while quality >= min_quality:
        buffer = BytesIO()
        img.save(buffer, format="JPEG", quality=quality, optimize=True)
        data = buffer.getvalue()

        if len(data) <= target_size:
            return data

        quality -= 5  # Reduce quality step by step

    # Last attempt at lowest quality
    buffer = BytesIO()
    img.save(buffer, format="JPEG", quality=min_quality, optimize=True)
    return buffer.getvalue()

def upload_to_cloudinary(image_bytes: bytes, filename="temp_image"):
    # Validate input
    if not image_bytes:
        logger.error("Empty image_bytes provided")
        return None

    compressed_bytes = ensure_jpeg_under_limit(image_bytes, target_size=MAX_CLOUDINARY_SIZE)

    with upload_lock:
        try:
            response = cloudinary.uploader.upload(
                compressed_bytes,
                public_id=filename,
                resource_type="image",
                overwrite=True,
                invalidate=True
            )
            secure_url = response.get("secure_url")
            if not secure_url:
                logger.error("No secure_url in Cloudinary response")
                return None
            logger.info(f"Uploaded image to Cloudinary: {secure_url}")
            return secure_url
        except Exception as e:
            logger.error(f"Cloudinary upload failed: {str(e)}")
            return None

def create_lut(low, high):
    if low >= 0:
        p1 = (+low, 0)
    else:
        p1 = (0, -low)
    if high >= 0:
        p2 = (255 - high, 255)
    else:
        p2 = (255, 255 + high)
    if p1[0] == p2[0]:
        return np.full(256, 255, np.uint8)
    lut = [
        (x * (p1[1] - p2[1]) + p1[0] * p2[1] - p1[1] * p2[0]) / (p1[0] - p2[0])
        for x in range(256)
    ]
    return np.clip(np.array(lut), 0, 255).astype(np.uint8)

