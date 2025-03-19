from celery import Celery
import os

redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "tasks",
    broker=redis_url,  # Ensure Redis URL is used
    backend=redis_url
)

celery_app.conf.worker_pool = "threads"
celery_app.conf.timezone = "UTC"