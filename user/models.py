from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from cloudinary.models import CloudinaryField


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractUser):
    refresh_token = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(
        max_length=15, unique=True, null=True, blank=True)

    objects = CustomUserManager()


    def __str__(self):
        if self.email:
            return self.email
        return self.phone_number


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    avatar = CloudinaryField('image', null=True, blank=True)
    bio = models.TextField(max_length=220, null=True, blank=True)
    last_seen = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - Profile'
