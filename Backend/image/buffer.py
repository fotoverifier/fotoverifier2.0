import redis
import json
from dotenv import load_dotenv
import os

load_dotenv()

redis_instance = redis.from_url(os.environ.get('REDIS_URL'))

def buffer_message(image_id, message):
    try:
        redis_instance.rpush(f'message_queue_{image_id}', json.dumps(message))
        print(f"Buffered message for image {image_id}: {message['task']}")
        redis_instance.expire(f'message_queue_{image_id}', 3600)  # Expiry after 1 hour
    except redis.RedisError as e:
        print(f"Error buffering message for image {image_id}: {e}")


def pop_messages(task_id):
    try:
        messages = redis_instance.lrange(f'message_queue_{task_id}', 0, -1)
        redis_instance.delete(f'message_queue_{task_id}')
        return [json.loads(message) for message in messages]
    except redis.RedisError as e:
        # Handle Redis-specific errors (e.g., connection issues)
        print(f"Error popping messages for task {task_id}: {e}")
        return []  # Return empty list on error, or log it as appropriate
