from django.contrib.auth.hashers import make_password
from rest_framework import serializers
import cloudinary

from app.backend.backend.custom_fields import CustomDateTimeField

from .models import CustomUser, Profile


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'phone_number', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super(CustomUserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data.get('password'))
        return super(CustomUserSerializer, self).update(instance, validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    avatar_url = serializers.SerializerMethodField()
    last_seen = CustomDateTimeField()
    created_at = CustomDateTimeField()
    updated_at = CustomDateTimeField()


    class Meta:
        model = Profile
        fields = ('id', 'user', 'avatar', 'avatar_url', 'bio',
                'last_seen', 'created_at', 'updated_at')

    def get_avatar_url(self, obj):
        if obj.avatar:
            return cloudinary.utils.cloudinary_url(obj.avatar.public_id, crop="fill")[0]
        return None
