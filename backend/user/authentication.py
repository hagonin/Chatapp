from rest_framework.authentication import BaseAuthentication
from firebase_admin import credentials, auth, exceptions as firebase_exceptions
import firebase_admin
from django.conf import settings
from .models import CustomUser
from .exceptions import NoAuthToken, InvalidCredentialsException, FirebaseError

# Initialize Firebase App
try:
    cred = credentials.Certificate(settings.FIREBASE_CONFIG)
    firebase_admin.initialize_app(cred)
except ValueError:
    pass


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
