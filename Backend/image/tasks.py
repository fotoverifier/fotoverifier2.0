from celery import shared_task
from algorithms.methods import exif_check, reverse_image_search, jpeg_ghost, super_resolution, recognize_objects, fake_image_detect
from .models import Image
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .buffer import buffer_message
import asyncio

@shared_task
def process_exif_check(image_id):
    image_instance = Image.objects.get(id=image_id)
    result = exif_check(file_path=image_instance.image.path)
    
    message = {'task': 'exif_check', 'result': result}
    buffer_message(image_id, message)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'exif_check', 'result': result}
        }
    )
    
    completion_message = {'task': 'exif_check', 'result': 'completed'}
    buffer_message(image_id, completion_message)
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': completion_message
        }
    )
    
    return result

@shared_task
def process_reverse_image_search(image_id):
    image_instance = Image.objects.get(id=image_id)
    result = reverse_image_search(image_path=image_instance.image.path)
    
    message = {'task': 'reverse_image_search', 'result': result}
    buffer_message(image_id, message)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'reverse_image_search', 'result': result}
        }
    )
    
    completion_message = {'task': 'reverse_image_search', 'result': 'completed'}
    buffer_message(image_id, completion_message)
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': completion_message
        }
    )
    
    return result

@shared_task
def process_jpeg_ghost(image_id):
    image_instance = Image.objects.get(id=image_id)
    result = jpeg_ghost(file_path=image_instance.image.path)
    
    message = {'task': 'jpeg_ghost', 'result': result}
    buffer_message(image_id, message)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'jpeg_ghost', 'result': result}
        }
    )
    
    completion_message = {'task': 'jpeg_ghost', 'result': 'completed'}
    buffer_message(image_id, completion_message)
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': completion_message
        }
    )
    return result

@shared_task
def process_super_resolution(image_id):
    image_instance = Image.objects.get(id=image_id)
    result = super_resolution(file_path=image_instance.image.path)
    
    message = {'task': 'super_resolution', 'result': result}
    buffer_message(image_id, message)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'super_resolution', 'result': result}
        }
    )
    
    completion_message = {'task': 'super_resolution', 'result': 'completed'}
    buffer_message(image_id, completion_message)
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': completion_message
        }
    )
    return result

@shared_task
def process_recognize_objects(image_id):
    image_instance = Image.objects.get(id=image_id)
    result = recognize_objects(file_path=image_instance.image.path)
    
    message = {'task': 'recognize_image', 'result': result}
    buffer_message(image_id, message)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'recognize_image', 'result': result}
        }
    )
    
    completion_message = {'task': 'recognize_image', 'result': 'completed'}
    buffer_message(image_id, completion_message)
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': {'task': 'recognize_image', 'result': 'completed'}
        }
    )
    
    return result

async def run_tasks(image_instance, image_id):
    result1 = await asyncio.to_thread(jpeg_ghost, file_path=image_instance.image.path)
    await buffer_message(image_id, {'task': 'jpeg_ghost', 'result': result1})

    result2 = await asyncio.to_thread(exif_check, file_path=image_instance.image.path)
    await buffer_message(image_id, {'task': 'exif_check', 'result': result2})

    result3 = await asyncio.to_thread(reverse_image_search, image_path=image_instance.image.path)
    await buffer_message(image_id, {'task': 'reverse_image_search', 'result': result3})

    result4 = await asyncio.to_thread(recognize_objects, file_path=image_instance.image.path)
    await buffer_message(image_id, {'task': 'recognize_image', 'result': result4})
    
    result5 = await asyncio.to_thread(fake_image_detect, file_path=image_instance.image.path)
    await buffer_message(image_id, {'task': 'ela', 'result': result5})

    await buffer_message(image_id, {'task': 'quick_scan', 'result': 'completed'})


    channel_layer = get_channel_layer()
    await channel_layer.group_send(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'jpeg_ghost', 'result': result1}
        }
    )
    await channel_layer.group_send(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'exif_check', 'result': result2}
        }
    )
    await channel_layer.group_send(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'reverse_image_search', 'result': result3}
        }
    )  
    await channel_layer.group_send(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'recognize_image', 'result': result4}
        }
    )
    await channel_layer.group_send(
        f'task_{image_id}',
        {
            'type': 'task_update',
            'message': {'task': 'ela', 'result': result5}
        }
    )
    await channel_layer.group_send(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': {'task': 'quick_scan', 'result': 'completed'}
        }
    )

@shared_task
def process_quick_scan(image_id):
    image_instance = Image.objects.get(id=image_id)

    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None

    # If there is an existing loop running, use it to create the task.
    if loop and loop.is_running():
        asyncio.create_task(run_tasks(image_instance, image_id))  # Use create_task() directly
    else:
        # If there's no loop running, this is still problematic in Celery
        # but `asyncio.run()` should not be used in Celery worker
        raise RuntimeError("No event loop found or Celery is blocking. Consider using a different approach.")