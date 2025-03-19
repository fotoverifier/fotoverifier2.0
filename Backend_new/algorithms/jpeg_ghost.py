import os
import cv2
import numpy as np
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
import cloudinary.uploader
from io import BytesIO

def jpeg_ghost(image_bytes):
    Qmin, Qmax, Qstep = 20, 90, 10
    shift_x, shift_y = 0, 0
    
    # Ensure input is raw bytes, not BytesIO
    if isinstance(image_bytes, BytesIO):
        image_bytes = image_bytes.getvalue()
    
    # Convert bytes to OpenCV image
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    original = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    
    if original is None:
        return {"jpeg_ghost_error": "Failed to decode image. Ensure it's a valid format."}

    original = np.double(original)
    ydim, xdim, zdim = original.shape
    nQ = (Qmax - Qmin) // Qstep + 1
    ghostmap = np.zeros((ydim, xdim, nQ))

    for i, quality in enumerate(range(Qmin, Qmax + 1, Qstep)):
        shifted = np.roll(original, shift_x, axis=1)
        shifted = np.roll(shifted, shift_y, axis=0)
        _, enc = cv2.imencode(".jpg", shifted, [cv2.IMWRITE_JPEG_QUALITY, quality])
        tmp_resave = np.double(cv2.imdecode(np.frombuffer(enc, np.byte), cv2.IMREAD_ANYCOLOR))
        
        if tmp_resave is None:
            return {"jpeg_ghost_error": "Failed to recompress image"}
        
        for z in range(zdim):
            ghostmap[:, :, i] += np.square(shifted[:, :, z] - tmp_resave[:, :, z])
        ghostmap[:, :, i] /= zdim

    return process_ghostmap(ghostmap, ydim, xdim, nQ, Qmin, Qstep)

def process_ghostmap(ghostmap, ydim, xdim, nQ, Qmin, Qstep):
    averagingBlock = 16
    blkE = np.zeros((ydim // averagingBlock, xdim // averagingBlock, nQ))

    for c in range(nQ):
        for y in range(0, ydim - averagingBlock, averagingBlock):
            for x in range(0, xdim - averagingBlock, averagingBlock):
                blkE[y // averagingBlock, x // averagingBlock, c] = np.mean(
                    ghostmap[y:y+averagingBlock, x:x+averagingBlock, c]
                )
    
    minval, maxval = np.min(blkE, axis=2), np.max(blkE, axis=2)
    blkE = (blkE - minval[..., None]) / (maxval[..., None] - minval[..., None])
    return generate_images(blkE, Qmin, Qstep, nQ)

def generate_images(blkE, Qmin, Qstep, nQ):
    image_urls = []
    os.makedirs("media", exist_ok=True)

    for c in range(nQ):
        quality = Qmin + c * Qstep
        if 30 <= quality <= 80:
            plt.imshow(blkE[:, :, c], cmap="gray", vmin=0, vmax=1)
            plt.axis("off")
            img_path = f"media/jpeg_ghost_quality_{quality}.png"
            plt.savefig(img_path, format="png", dpi=200)
            plt.close()
            
            try:
                response = cloudinary.uploader.upload(img_path)
                image_urls.append(response["secure_url"])
            finally:
                os.remove(img_path)  # ✅ Deletes the file after uploading
    
    print(image_urls)
    return image_urls
