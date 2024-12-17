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
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': {'task': 'exif_check', 'result': 'completed'}
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
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': {'task': 'reverse_image_search', 'result': 'completed'}
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
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': {'task': 'jpeg_ghost', 'result': 'completed'}
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
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {
            'type': 'task_complete',
            'message': {'task': 'super_resolution', 'result': 'completed'}
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

    # result3 = await asyncio.to_thread(reverse_image_search, image_path=image_instance.image.path)
    # await buffer_message(image_id, {'task': 'reverse_image_search', 'result': result3})

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
    # await channel_layer.group_send(
    #     f'task_{image_id}',
    #     {
    #         'type': 'task_update',
    #         'message': {'task': 'reverse_image_search', 'result': result3}
    #     }
    # )
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
            'type': 'task_complete',
            'message': {'task': 'quick_scan', 'result': 'completed'}
        }
    )

@shared_task
def process_quick_scan(image_id):
    image_instance = Image.objects.get(id=image_id)
    asyncio.run(run_tasks(image_instance, image_id))