# syntax=docker/dockerfile:1.4

########################
# ---- Builder ----
########################
FROM python:3.10-slim AS builder

WORKDIR /app

# Install system dependencies for building
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        git \
        libgl1 \
        libglib2.0-0 \
        libjpeg-dev \
        libpng-dev \
        libtiff-dev \
        libavcodec-dev \
        libavformat-dev \
        libswscale-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy only requirements first for better caching
COPY requirements.txt .

# Build wheels into /wheels
RUN pip install --upgrade pip && \
    pip wheel --wheel-dir=/wheels -r requirements.txt


########################
# ---- Final ----
########################
FROM python:3.10-slim

WORKDIR /app

# Install only runtime libraries (no -dev)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copy built wheels from builder and install them
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# Copy your actual app
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9001"]
