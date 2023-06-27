from django.contrib import admin
from django.contrib.auth.models import Group
from .models import CustomUser, Profile

admin.site.register(CustomUser)
admin.site.register(Profile)

admin.site.unregister(Group)
admin.site.site_header = "Chat App Admin"
