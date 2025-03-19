from celery_config import celery_app
from celery import group
from algorithms.exif import exif_check
from algorithms.ela import ela
from algorithms.ram import recognize_objects
from algorithms.jpeg_ghost import jpeg_ghost
from algorithms.reverse_search import reverse_image_search
import io
import redis
import os
import json

redis_client = redis.from_url(os.environ.get('REDIS_URL'))

@celery_app.task
def process_exif(image_bytes):
    return {"exif_data": exif_check(image_bytes), "method": "exif"}

@celery_app.task
def process_ela(image_bytes):
    file_stream = io.BytesIO(image_bytes)
    return {"ela_image": ela(file_stream), "method": "ela"}

@celery_app.task
def process_ram(image_bytes):
    return {"recognized_objects": recognize_objects(image_bytes), "method": "ram"}

@celery_app.task
def process_jpeg_ghost(image_bytes):
    file_stream = io.BytesIO(image_bytes)
    return {"jpeg_ghost": jpeg_ghost(file_stream), "method": "jpeg_ghost"}

@celery_app.task
def process_reverse_search(image_bytes):
    file_stream = io.BytesIO(image_bytes)
    return {"reverse_search": reverse_image_search(file_stream), "method": "reverse_search"}

@celery_app.task
def process_quick_scan(image_bytes):
    task_group = group(
        process_exif.s(image_bytes),
        process_ela.s(image_bytes),
        process_ram.s(image_bytes),
        process_jpeg_ghost.s(image_bytes),
        process_reverse_search.s(image_bytes)
    )
    results = task_group.apply_async()
    # Save only child task IDs
    redis_client.set(f"task-children-{results.id}", json.dumps([child.id for child in results.children]), ex=300)

    return results.id
