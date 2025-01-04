import redis.asyncio as redis
import json
from dotenv import load_dotenv
import os

load_dotenv()

redis_instance = redis.from_url(os.environ.get('REDIS_URL'))

async def buffer_message(image_id, message):
    await redis_instance.rpush(f'message_queue_{image_id}', json.dumps(message))

async def pop_messages(task_id):
    messages = await redis_instance.lrange(f'message_queue_{task_id}', 0, -1)
    await redis_instance.delete(f'message_queue_{task_id}')
    return [json.loads(message) for message in messages]
