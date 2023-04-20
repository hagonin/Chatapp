import firebase_admin
from user import exceptions
from rest_framework.authentication import BaseAuthentication
from firebase_admin import credentials, auth
from django.conf import settings

from .models import CustomUser

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

class FirebaseAuthenticationBackend(BaseAuthentication):
    """Override authenticate method and write custom firebase authentication"""
    
    def authenticate(self, request):
        # get the authentication token
        # raise exception when no authorization token is give
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            raise exceptions.NoAuthToken("No auth token provided")
        
        # decode the token and raise exception when decode failed
        id_token = auth_header.split(' ').pop()
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception :
            raise exceptions.NoAuthToken(
                "Invalid auth token provided")
        
        # return nothing 
        if not id_token or not decoded_token:
            return None
        
        # get the uid of an user 
        try:
            uid = decoded_token.get('uid')
        except Exception:
            raise exceptions.FirebaseError("Firebase error")
        
        # get or create user
        user, created = CustomUser.objects.get_or_create(username=uid)
        return (user,None)