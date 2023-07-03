from firebase_admin import auth
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser, BaseUserManager
from cloudinary.models import CloudinaryField


class CustomUserManager(BaseUserManager):

    def create_user(self, username, email=None, phone_number=None, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username must be set')

        email = self.normalize_email(email)

        user = self.model(
            username=username,
            email=email,
            phone_number=phone_number,
            **extra_fields
        )
        # Integrate Firebase authentication
        if email:
            firebase_user = auth.create_user(email=email, password=password)
            user.firebase_uid = firebase_user.uid
        elif phone_number:
            firebase_user = auth.create_user(
                phone_number=phone_number, password=password)
            user.firebase_uid = firebase_user.uid

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not username:
            raise ValueError('The Username field must be set')
        return self.create_user(username=username, password=password, **extra_fields)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(
        max_length=15, unique=True, null=True, blank=True)
    firebase_uid = models.CharField(
        max_length=255, unique=True, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username' 
    REQUIRED_FIELDS = []

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

# automatically create/update Profile when a User is created/updated

@receiver(post_save, sender=CustomUser)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.profile.save()
