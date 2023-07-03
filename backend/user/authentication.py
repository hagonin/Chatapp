from rest_framework.authentication import BaseAuthentication
from firebase_admin import credentials, auth, exceptions as firebase_exceptions
import firebase_admin
from django.conf import settings
from .models import CustomUser
from .exceptions import NoAuthToken, InvalidCredentialsException, FirebaseError

"""SETUP FIREBASE CREDENTIALS"""
cred = credentials.Certificate({
    "type": settings.FIREBASE_ACCOUNT_TYPE,
    "project_id": settings.FIREBASE_PROJECT_ID,
    "private_key_id": settings.FIREBASE_PRIVATE_KEY_ID,
    "private_key": settings.FIREBASE_PRIVATE_KEY.replace('\\n', '\n'),
    "client_email": settings.FIREBASE_CLIENT_EMAIL,
    "client_id": settings.FIREBASE_CLIENT_ID,
    "auth_uri": settings.FIREBASE_AUTH_URI,
    "token_uri": settings.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": settings.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": settings.FIREBASE_CLIENT_X509_CERT_URL
})

default_app = firebase_admin.initialize_app(cred)
"""FIREBASE AUTHENTICATION"""

class FirebaseAuthentication(BaseAuthentication):
    """
    Firebase authentication backend
    """

    def authenticate(self, request):
        """
        Authentication method to authenticate user from Firebase token
        """
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header or ' ' not in auth_header:
            raise NoAuthToken()

        auth_type, id_token = auth_header.split()

        # Check if the request is made with a Bearer token
        if auth_type.lower() != 'bearer':
            raise InvalidCredentialsException(
                'Invalid token type, expected Bearer')

        try:
            decoded_token = auth.verify_id_token(id_token)
        except (ValueError, firebase_exceptions.FirebaseError):
            raise InvalidCredentialsException(
                'Invalid or expired Firebase token')

        uid = decoded_token.get("uid")
        if not uid:
            raise FirebaseError()

        user, created = CustomUser.objects.get_or_create(username=uid)
        return user, None

    def get_user(self, user_id):
        """
        Retrieve the user by their user_id
        """
        try:
            return CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return None
