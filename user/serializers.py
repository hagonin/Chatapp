from rest_framework import serializers
import cloudinary
from core.custom_fields import CustomDateTimeField
from .models import CustomUser, Profile


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'phone_number', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        uid = validated_data.pop('username')
        password = validated_data.pop('password')
        user = CustomUser(username=uid,**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)


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
            return cloudinary.utils.cloudinary_url(obj.avatar.public_id,crop="fill")[0]
        return None
