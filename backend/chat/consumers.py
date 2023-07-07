import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist

from chat.models import Room, Message
from user.models import CustomUser


@database_sync_to_async
def create_new_message(me, friend, message, room_id):
    try:
        get_room = Room.objects.get(id=room_id)
        author_user = CustomUser.objects.get(username=me)
        friend_user = CustomUser.objects.get(username=friend)
        new_message = Message.objects.create(
            author=author_user,
            friend=friend_user,
            room_id=get_room,
            content=message)
    except ObjectDoesNotExist:
        # Log the error or send a message to the client
        print("An error occurred while creating a new message.")


class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user = text_data_json['username']
        room_id = text_data_json['room_id']

        # Assuming you have a way to determine the friend's username
        friend = "friend_username"
        await create_new_message(me=user, friend=friend, message=message, room_id=room_id)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'user': user
            }
        )

    async def chat_message(self, event):
        message = event['message']
        user = event['user']

        await self.send(text_data=json.dumps({
            'message': message,
            'user': user,
            'room_name': self.room_name
        }))
