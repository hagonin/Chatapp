from .base import *

DEBUG = False

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
ALLOWED_HOSTS = ['talkie-api.up.railway.app']
CSRF_TRUSTED_ORIGINS = [
    'https://talkie-api.up.railway.app',
]
CORS_ALLOWED_ORIGINS = [
    "https://talkie-api.up.railway.app",
]

SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True