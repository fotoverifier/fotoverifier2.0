import json
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import redis.asyncio as redis
from dotenv import load_dotenv
import os

load_dotenv()

class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.task_id = self.scope['url_route']['kwargs']['task_id']
        self.task_group_name = f'task_{self.task_id}'


        await self.channel_layer.group_add(
            self.task_group_name,
            self.channel_name
        )

        await self.accept()
        
        self.redis_client = redis.from_url(os.environ.get('REDIS_URL'))
        self.pubsub = self.redis_client.pubsub()
        await self.pubsub.subscribe(f'message_channel_{self.task_id}')
        
        asyncio.create_task(self.listen_to_channel())
        
    async def listen_to_channel(self):
        async for message in self.pubsub.listen():
            if message['type'] == 'message':
                data = json.loads(message['data'])
                await self.send(text_data=json.dumps(data))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.task_group_name,
            self.channel_name
        )
        await self.pubsub.unsubscribe(f'message_channel_{self.task_id}')
        await self.redis_client.close()

    async def task_update(self, event):
        await self.send(text_data=json.dumps(event['message']))
    
    async def task_complete(self, event):
        await self.send(text_data=json.dumps(event['message']))
        await self.close()