import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import cloudinary.uploader

def jpeg_ghost(file_path):
    Qmin, Qmax, Qstep = 20, 90, 10
    shift_x, shift_y = 0, 0

    original = np.double(cv2.imread(file_path))
    if original is None:
        raise ValueError("Failed to read image")
    
    ydim, xdim, zdim = original.shape
    nQ = (Qmax - Qmin) // Qstep + 1
    ghostmap = np.zeros((ydim, xdim, nQ))

    for i, quality in enumerate(range(Qmin, Qmax + 1, Qstep)):
        shifted = np.roll(original, shift_x, axis=1)
        shifted = np.roll(shifted, shift_y, axis=0)
        _, enc = cv2.imencode(".jpg", shifted, [cv2.IMWRITE_JPEG_QUALITY, quality])
        tmp_resave = np.double(cv2.imdecode(np.frombuffer(enc, np.byte), cv2.IMREAD_ANYCOLOR))
        
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
            image_urls.append(cloudinary.uploader.upload(img_path)["secure_url"])
    
    return image_urls
