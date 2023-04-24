from .base import *

DEBUG = False

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
ALLOWED_HOSTS = ['talkie-api.up.railway.app', 'localhost',
                '192.168.1.87',]
CSRF_TRUSTED_ORIGINS = [
    'https://talkie-api.up.railway.app',
    'http://localhost:3000',
    'http://192.168.1.87:3000',
]
CORS_ALLOWED_ORIGINS = [
    "https://talkie-api.up.railway.app",
    'http://localhost:3000',
    'http://192.168.1.87:3000',
]

SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True