import os
from io import BytesIO
from PIL import Image
import torch
import numpy as np
import cv2

from basicsr.archs.rrdbnet_arch import RRDBNet
from basicsr.utils.download_util import load_file_from_url
from .realesrgan.utils import RealESRGANer

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_esrgan(scale):
    
    print("🔄 Loading ESRGAN model...")
    model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64,
                    num_block=23, num_grow_ch=32, scale=4)

    model_name = "RealESRGAN_x4plus"
    model_path = os.path.join("algorithms", model_name + ".pth")

    if not os.path.isfile(model_path):
        file_url = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth"
        model_path = load_file_from_url(
            url=file_url, model_dir=os.path.dirname(model_path), progress=True)

    upscaler = RealESRGANer(
        scale=scale,
        model_path=model_path,
        model=model,
        tile=0,
        tile_pad=10,
        pre_pad=0,
        half=torch.cuda.is_available(),  # use half precision only if CUDA
        gpu_id=None if device.type == "cpu" else 0
    )
    print("🔄 Loaded ESRGAN model...")
    return upscaler

def super_resolution(image_bytes: bytes, scale) -> bytes:
    try:
        upscaler = load_esrgan(scale)

        # Read image
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        img_np = np.array(image)[:, :, ::-1]  # RGB to BGR for OpenCV

        # Super-resolve
        output, _ = upscaler.enhance(img_np, outscale=scale)

        # Convert back to PIL.Image (BGR to RGB)
        output_rgb = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)
        result_image = Image.fromarray(output_rgb)

        # Convert to bytes
        buffer = BytesIO()
        result_image.save(buffer, format="PNG")
        return buffer.getvalue()

    except Exception as e:
        raise ValueError(f"Error during image enhancement: {str(e)}")
