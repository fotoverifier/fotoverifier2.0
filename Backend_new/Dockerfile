# syntax=docker/dockerfile:1.4

########################
# ---- Builder ----
########################
FROM python:3.10-slim AS builder

WORKDIR /app

# Install system build deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential gcc git && \
    rm -rf /var/lib/apt/lists/*

# Install latest pip
RUN pip install --upgrade pip

# Copy only requirements first for better caching
COPY requirements.txt .
RUN pip wheel --wheel-dir=/wheels -r requirements.txt


########################
# ---- Final ----
########################
FROM python:3.10-slim

WORKDIR /app

# Minimal runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libglib2.0-0 libjpeg62-turbo && \
    rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copy built wheels from builder and install them
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# Copy your actual app
COPY . .

# Expose FastAPI port
EXPOSE 9001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9001"]
