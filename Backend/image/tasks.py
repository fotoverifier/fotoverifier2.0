from celery import shared_task, group
from algorithms.methods import exif_check, reverse_image_search, jpeg_ghost, super_resolution, recognize_objects, ela
from .models import Image
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .buffer import buffer_message

@shared_task
def process_exif_check(image_id):
    try:
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
    except Exception as e:
        error_message = {'task': 'exif_check', 'status': 'failed', 'error': str(e)}
        buffer_message(image_id, error_message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {'type': 'task_error', 'message': error_message}
        )
        raise e

@shared_task
def process_reverse_image_search(image_id):
    try:
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
    except Exception as e:
        error_message = {'task': 'reverse_image_search', 'status': 'failed', 'error': str(e)}
        buffer_message(image_id, error_message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {'type': 'task_error', 'message': error_message}
        )
        raise e

@shared_task
def process_jpeg_ghost(image_id):
    try:
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
    except Exception as e:
        error_message = {'task': 'jpeg_ghost', 'status': 'failed', 'error': str(e)}
        buffer_message(image_id, error_message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {'type': 'task_error', 'message': error_message}
        )
        raise e

@shared_task
def process_super_resolution(image_id):
    try:
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
    except Exception as e:
        error_message = {'task': 'super_resolution', 'status': 'failed', 'error': str(e)}
        buffer_message(image_id, error_message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {'type': 'task_error', 'message': error_message}
        )
        raise e

@shared_task
def process_recognize_objects(image_id):
    try:
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
    except Exception as e:
        error_message = {'task': 'recognize_image', 'status': 'failed', 'error': str(e)}
        buffer_message(image_id, error_message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {'type': 'task_error', 'message': error_message}
        )
        raise e

@shared_task
def process_ela(image_id):
    try:
        image_instance = Image.objects.get(id=image_id)
        result = ela(file_path=image_instance.image.path)
        
        message = {'task': 'ela', 'result': result}
        buffer_message(image_id, message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {
                'type': 'task_update',
                'message': {'task': 'ela', 'result': result}
            }
        )
        
        completion_message = {'task': 'ela', 'result': 'completed'}
        buffer_message(image_id, completion_message)
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {
                'type': 'task_complete',
                'message': completion_message
            }
        )
    except Exception as e:
        error_message = {'task': 'ela', 'status': 'failed', 'error': str(e)}
        buffer_message(image_id, error_message)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'task_{image_id}',
            {'type': 'task_error', 'message': error_message}
        )
        raise e

@shared_task
def process_quick_scan(image_id):
    # You can optionally group them for parallel execution
    group(
        process_jpeg_ghost.s(image_id),
        process_ela.s(image_id),
        process_exif_check.s(image_id),
        process_reverse_image_search.s(image_id),
        process_recognize_objects.s(image_id),
    )()
    message = {'task': 'quick_scan', 'status': 'initiated'}
    buffer_message(image_id, message)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'task_{image_id}',
        {'type': 'task_update', 'message': message}
    )