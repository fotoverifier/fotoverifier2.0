from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

redis_url = os.getenv("REDIS_URL")

if not redis_url:
    raise ValueError("REDIS_URL is not set! Check your .env file.")

celery_app = Celery(
    "tasks",
    broker=redis_url,  # Ensure Redis URL is used
    backend=redis_url
)

celery_app.conf.worker_pool = "threads"
celery_app.conf.timezone = "UTC"