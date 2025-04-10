import cv2 as cv
import numpy as np

import cloudinary
import cloudinary.uploader
import cloudinary.api
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import os
from dotenv import load_dotenv

load_dotenv()

# Create a custom requests session
session = requests.Session()
adapter = HTTPAdapter(pool_connections=5, pool_maxsize=10, max_retries=Retry(total=3))
session.mount('https://', adapter)
session.mount('http://', adapter)

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET"),
    secure=True
)

def upload_to_cloudinary(image_bytes: bytes, filename="temp_image"):
    return cloudinary.uploader.upload(
        image_bytes,
        public_id=filename,
        resource_type="image",
        overwrite=True,
        invalidate=True
    )["secure_url"]

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

