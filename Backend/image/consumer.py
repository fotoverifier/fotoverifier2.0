import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import redis.asyncio as redis
from dotenv import load_dotenv
import os
from .buffer import buffer_message, pop_messages

load_dotenv()

# Configure logger
logger = logging.getLogger("websocket")

class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.task_id = self.scope['url_route']['kwargs']['task_id']
        self.task_group_name = f'task_{self.task_id}'

        logger.info(f"WebSocket connected: Task ID {self.task_id}")

        await self.channel_layer.group_add(
            self.task_group_name,
            self.channel_name
        )
        await self.accept()
        
        messages = pop_messages(self.task_id)
        for message in messages:
            await self.send(text_data=json.dumps(message))
        
        self.redis_client = redis.from_url(os.environ.get('REDIS_URL'))
        
        try:
            self.pubsub = self.redis_client.pubsub()
            await self.pubsub.subscribe(f'message_channel_{self.task_id}')
            logger.info(f"Subscribed to Redis channel: message_channel_{self.task_id}")

            # Start listening task
            self.listen_task = asyncio.create_task(self.listen_to_channel())
        except Exception as e:
            logger.error(f"Failed to subscribe to Redis channel: {e}")
            await self.send(text_data=json.dumps({"error": "Failed to subscribe to task channel"}))
        
    async def listen_to_channel(self):
        try:
            async for message in self.pubsub.listen():
                if message['type'] == 'message':
                    try:
                        data = json.loads(message['data'])
                        buffer_message(self.task_id, data)
                        await self.send(text_data=json.dumps(data))
                        logger.info(f"Received message from Redis: {data}")
                    except json.JSONDecodeError:
                        logger.warning(f"Malformed message received: {message['data']}")
                        await self.send(text_data=json.dumps({"error": "Malformed message received"}))
        except asyncio.CancelledError:
            logger.info(f"Redis listener cancelled for Task ID {self.task_id}")
        except Exception as e:
            logger.error(f"Error in message listening: {e}")
            await self.send(text_data=json.dumps({"error": f"Error in message listening: {str(e)}"}))
        finally:
            await self.pubsub.unsubscribe(f'message_channel_{self.task_id}')
            logger.info(f"Unsubscribed from Redis channel: message_channel_{self.task_id}")
            
    async def disconnect(self, close_code):
        logger.info(f"WebSocket disconnected: Task ID {self.task_id} (Code: {close_code})")
        
        self.listen_task.cancel()
        try:
            await self.listen_task
        except asyncio.CancelledError:
            pass
        
        await self.channel_layer.group_discard(
            self.task_group_name,
            self.channel_name
        )

        if self.redis_client:
            await self.redis_client.close()
            logger.info(f"Redis connection closed for Task ID {self.task_id}")

    async def task_update(self, event):
        logger.info(f"Task update received: {event['message']}")
        await self.send(text_data=json.dumps(event['message']))
    
    async def task_complete(self, event):
        logger.info(f"Task completed: {event['message']}")
        await self.send(text_data=json.dumps(event['message']))