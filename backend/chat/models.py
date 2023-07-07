from django.db import models
from user.models import CustomUser


class Room(models.Model):
    room_name = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(CustomUser, related_name='room')
    is_private = models.BooleanField(default=False)

    def __str__(self):
        return self.room_name


class Message(models.Model):
    room = models.ForeignKey(
        Room, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='messages')
    date_added = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ('date_added',)

    def __str__(self):
        return '%s - %s' %(self.user, self.date_added)