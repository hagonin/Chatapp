"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path
import cloudinary
import dj_database_url
from decouple import config
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# clouinary config
cloudinary.config(
    cloud_name=config('CLOUD_NAME'),
    api_key=config('CLOUD_API_KEY'),
    api_secret=config('CLOUD_API_SECRET'),
    secure=True
)

# Firebase config
FIREBASE_CONFIG = {
    'FIREBASE_ACCOUNT_TYPE': config('FIREBASE_ACCOUNT_TYPE'),
    'FIREBASE_PROJECT_ID': config('FIREBASE_PROJECT_ID'),
    'FIREBASE_PRIVATE_KEY_ID': config('FIREBASE_PRIVATE_KEY_ID'),
    'FIREBASE_PRIVATE_KEY': config('FIREBASE_PRIVATE_KEY'),
    'FIREBASE_CLIENT_EMAIL': config('FIREBASE_CLIENT_EMAIL'),
    'FIREBASE_CLIENT_ID': config('FIREBASE_CLIENT_ID'),
    'FIREBASE_AUTH_URI': config('FIREBASE_AUTH_URI'),
    'FIREBASE_TOKEN_URI': config('FIREBASE_TOKEN_URI'),
    'FIREBASE_AUTH_PROVIDER_X509_CERT_URL': config(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
    'FIREBASE_CLIENT_X509_CERT_URL': config('FIREBASE_CLIENT_X509_CERT_URL')
}

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    'cloudinary',
    'drf_spectacular',
    # local apps
    'user'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

db_config = dj_database_url.config(conn_max_age=600, ssl_require=True)
if db_config:
    # railway - production
    DATABASES = {}
    DATABASES['default'] = db_config
else:
    # local/development
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': config("DB_NAME"),
            'USER': config("DB_USERNAME"),
            'PASSWORD': config("DB_PASSWORD"),
            'HOST': config("DB_HOSTNAME"),
            'PORT': config("DB_PORT")
        }
    }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',

    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

AUTHENTICATION_BACKENDS = [
    'user.authentication.FirebaseAuthentication'
]

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}


SPECTACULAR_SETTINGS = {
    'TITLE': 'Chatapp API',
    'DESCRIPTION': 'A chat app API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

AUTH_USER_MODEL = 'user.CustomUser'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# https://docs.djangoproject.com/en/4.1/topics/logging/
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        'verbose': {
            'format': '%(levelname)s  %(asctime)s  %(module)s %(message)s'
        },
    },
    "handlers": {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    'loggers': {
        'django.security.DisallowedHost': {
            'handlers': ['null'],
            'propagate': False,
        },
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
        'django.request': {
            'level': 'WARNING',
            'handlers': ['console'],
            'propagate': False,
        },
    }
}
