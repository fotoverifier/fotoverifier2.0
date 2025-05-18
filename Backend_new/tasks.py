from algorithms.super_resolution import super_resolution
from celery_config import celery_app
from celery import group
from algorithms.exif import exif_check
from algorithms.ela import ela
from algorithms.ram import recognize_objects
from algorithms.jpeg_ghost import jpeg_ghost
import io
import redis
import os
import json
from dotenv import load_dotenv

load_dotenv()

redis_url = os.getenv("REDIS_URL")

if not redis_url:
    raise ValueError("REDIS_URL is not set! Check your .env file.")


redis_client = redis.from_url(redis_url)

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

# @celery_app.task
# def process_reverse_search(image_bytes):
#     try:
#         results = asyncio.run(reverse_image_search(image_bytes))
#         return {"reverse_search": str(results), "method": "reverse_search"}
#     except Exception as e:
#         return {"reverse_search": f"Error: {str(e)}", "method": "reverse_search"}

@celery_app.task
def process_super_resolution(image_bytes, scale):
    try:
        result = super_resolution(image_bytes, scale)
        return {"super_resolution": result, "method": "super_resolution"}
    except Exception as e:
        return {"super_resolution": f"Error: {str(e)}", "method": "super_resolution"}


@celery_app.task
def process_quick_scan(image_bytes):
    task_group = group(
        process_exif.s(image_bytes),
        process_ela.s(image_bytes),
        process_ram.s(image_bytes),
        process_jpeg_ghost.s(image_bytes),
    )
    results = task_group.apply_async()
    # Save only child task IDs
    redis_client.set(f"task-children-{results.id}", json.dumps([child.id for child in results.children]), ex=300)

    return results.id
