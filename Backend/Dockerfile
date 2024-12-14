FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*

ENV CLOUD_NAME=dhwi6wtrj
ENV CLOUD_API_KEY=237324986757275
ENV CLOUD_API_SECRET=dVF-YkIcaEcw5jwINxBYrudiGeE
ENV REDIS_URL=redis://:9UIBhPugTZ1tkTORHbCZoyjpGi72HdLG@redis-16192.c309.us-east-2-1.ec2.redns.redis-cloud.com:16192/0
ENV TF_ENABLE_ONEDNN_OPTS=0
ENV SERPAPI_SECRET_KEY=b945106cd612c06211da4507b158c6861c6e1059c0de67d92f0aedcd889f29ab

COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD ["daphne", "-p", "8000", "fotoverifierbackend.asgi:application"]