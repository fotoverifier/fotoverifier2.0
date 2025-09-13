# syntax=docker/dockerfile:1.4

########################
# ---- Builder ----
########################
FROM python:3.10 AS builder

WORKDIR /app

# Install system build deps
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        git \
        && rm -rf /var/lib/apt/lists/*

# Upgrade pip & wheel
RUN pip install --upgrade pip wheel setuptools

# Copy only requirements first for better caching
COPY requirements.txt .

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -v -r requirements.txt

RUN sed -i 's/from torchvision.transforms.functional_tensor import rgb_to_grayscale/from torchvision.transforms.functional import rgb_to_grayscale/' \
    $(python -c "import site, os; print(os.path.join(site.getsitepackages()[0], 'basicsr', 'data', 'degradations.py'))")


########################
# ---- Model Downloader ----
########################
# FROM python:3.10-slim AS model-downloader

# WORKDIR /models

# # Install curl with ETag support
# RUN apt-get update && apt-get install -y --no-install-recommends curl && \
#     rm -rf /var/lib/apt/lists/*

# # Cache folder for etags
# RUN mkdir -p /models/.curl-cache

# # Download models with ETag caching
# # These commands will only re-download if the ETag changes on Hugging Face
# RUN --mount=type=cache,target=/models/.curl-cache \
#     curl -L \
#         --etag-save /models/.curl-cache/realesrgan.etag \
#         --etag-compare /models/.curl-cache/realesrgan.etag \
#         -o RealESRGAN_x4plus.pth \
#         https://huggingface.co/schwgHao/RealESRGAN_x4plus/resolve/main/RealESRGAN_x4plus.pth \
#     && curl -L \
#         --etag-save /models/.curl-cache/ram.etag \
#         --etag-compare /models/.curl-cache/ram.etag \
#         -o ram_plus_swin_large_14m.pth \
#         https://huggingface.co/xinyu1205/recognize-anything-plus-model/resolve/main/ram_plus_swin_large_14m.pth




########################
# ---- Final ----
########################
FROM python:3.10-slim

WORKDIR /app

# Install runtime system libs (needed for OpenCV, Pillow, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libsm6 libxext6 libxrender1 libjpeg62-turbo zlib1g libgl1 \
 && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copy Python environment from builder
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy models from model stage
# COPY --from=model-downloader /models/*.pth /app/algorithms/

# Copy only application code (whitelist)
COPY main.py tasks.py celery_config.py ./
COPY algorithms ./algorithms

# Expose FastAPI port
EXPOSE 9001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9001"]
