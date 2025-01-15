import redis
import json
from dotenv import load_dotenv
import os

load_dotenv()

redis_instance = redis.from_url(os.environ.get('REDIS_URL'))

def buffer_message(image_id, message):
    redis_instance.rpush(f'message_queue_{image_id}', json.dumps(message))

def pop_messages(task_id):
    messages = redis_instance.lrange(f'message_queue_{task_id}', 0, -1)
    redis_instance.delete(f'message_queue_{task_id}')
    return [json.loads(message) for message in messages]
