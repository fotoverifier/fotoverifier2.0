import os
from io import BytesIO
from .utility import upload_to_cloudinary
from PIL import Image
import torch
import numpy as np
import cv2

from basicsr.archs.rrdbnet_arch import RRDBNet
from basicsr.utils.download_util import load_file_from_url
from .realesrgan.utils import RealESRGANer

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def super_resolution(image_bytes: bytes, scale) -> str:
    try:
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
            tile=200,
            tile_pad=5,
            pre_pad=0,
            half=torch.cuda.is_available(),  # ✅ half precision on GPU
            gpu_id=None if device.type == "cpu" else 0
        )

        print("✅ ESRGAN model loaded")

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
        result_image.save(buffer, format="PNG", optimize=True)
        buffer.seek(0)

        # Upload to Cloudinary
        url = upload_to_cloudinary(buffer.getvalue(), filename="super_resolution_result")
        print("Returning URL:", url)

        # Free memory
        del model
        del upscaler
        torch.cuda.empty_cache()

        return url

    except Exception as e:
        torch.cuda.empty_cache()  # just in case
        raise ValueError(f"Error during image enhancement: {str(e)}")
