FROM python:3.12-slim

WORKDIR /app

# Install system dependencies required for OpenCV and other tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    libgl1 \
    libglib2.0-0 \        
    libjpeg-dev \  
    libpng-dev \       
    libtiff-dev \  
    libavcodec-dev \    
    libavformat-dev \    
    libswscale-dev && \   
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV CLOUD_NAME=dhwi6wtrj \
    CLOUD_API_KEY=237324986757275 \
    CLOUD_API_SECRET=dVF-YkIcaEcw5jwINxBYrudiGeE \
    REDIS_URL=redis://redis:6379/0 \
    TF_ENABLE_ONEDNN_OPTS=0 \
    SERPAPI_SECRET_KEY=b945106cd612c06211da4507b158c6861c6e1059c0de67d92f0aedcd889f29ab \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . /app/