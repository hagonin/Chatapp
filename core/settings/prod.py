from .base import *

DEBUG = False

ALLOWED_HOSTS = ['*']

INSTALLED_APPS += [
    'cloudinary'
]

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUD_NAME'),
    'API_KEY': config('CLOUD_API_KEY'),
    'API_SECRET': config('CLOUD_API_SECRET')
}