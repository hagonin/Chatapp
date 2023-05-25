import boto3
from botocore.exceptions import ClientError
import hmac
import hashlib
import base64
from django.db import models
from decouple import config
from botocore.config import Config
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext as _
from cloudinary.models import CloudinaryField


class CustomUserManager(BaseUserManager):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cognito_idp_client = boto3.client(
            'cognito-idp', region_name=config('AWS_COGNITO_REGION_NAME'))
        self.client_id = config('AWS_ACCESS_KEY_ID')
        self.client_secret = config('AWS_SECRET_ACCESS_KEY')
        self.user_pool_id = config('AWS_COGNITO_USER_POOL_ID')

    def _secret_hash(self, identifier):
        msg = identifier + self.client_id
        dig = hmac.new(str(self.client_secret).encode('utf-8'),
                    msg=str(msg).encode('utf-8'),
                    digestmod=hashlib.sha256).digest()
        return base64.b64encode(dig).decode()

    def create_user(self, password, user_email=None, phone_number=None):
        confirmed = False
        try:
            identifier = user_email if user_email else phone_number
            kwargs = {
                'ClientId': self.client_id,
                'Username': identifier,
                'Password': password,
                'UserAttributes': [{'Name': 'email', 'Value': user_email}] if user_email else [{'Name': 'phone_number', 'Value': phone_number}]
            }
            if self.client_secret is not None:
                kwargs['SecretHash'] = self._secret_hash(identifier)
            response = self.cognito_idp_client.sign_up(**kwargs)
            confirmed = response['UserConfirmed']
        except ClientError as err:
            if err.response['Error']['Code'] == 'UsernameExistsException':
                try:
                    if user_email:
                        response = self.cognito_idp_client.admin_get_user(
                            UserPoolId=self.user_pool_id,
                            Username=user_email
                        )
                    elif phone_number:
                        response = self.cognito_idp_client.admin_get_user(
                            UserPoolId=self.user_pool_id,
                            Username=phone_number
                        )
                        confirmed = response['UserStatus'] == 'CONFIRMED'
                except ClientError as err:
                    raise
            else:
                raise
            return confirmed

    def create_superuser(self, email=None, phone_number=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, phone_number, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=True, blank=True)
    phone_number = models.CharField(
        max_length=15, unique=True, null=True, blank=True)
    username = models.CharField(
        max_length=128, unique=True, null=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

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
