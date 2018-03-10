"""
Django settings for isaacwebsite project.

Generated by 'django-admin startproject' using Django 1.11.2.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

GA_TRACKING_ID = os.environ['GA_TRACKING_ID']

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY_SETTING']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [os.environ['SERVER_SETTING'], 'isaaclayton.com', 'www.isaaclayton.com']

# Application definition

INSTALLED_APPS = [
    #3rd party apps
    'grappelli',
    'storages',
    'webpack_loader'
    #self-made apps
    'blog',
    'utils',
    'home',
    'projects',
    #Start standard installed apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'isaacwebsite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [(os.path.join(BASE_DIR, "templates"))],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'isaacwebsite.context_processors.ga_tracking_id'
            ],
        },
    },
]

WSGI_APPLICATION = 'isaacwebsite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'website',
        'USER': 'websiteadmin',
        'PASSWORD': os.environ['PASSWORD_SETTING']
    },
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

#STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
    os.path.join(BASE_DIR, "assets"),
]

WEBPACK_LOADER = {
    'JEOPARDY': {
            'BUNDLE_DIR_NAME': 'jeopardy_bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'assets/jeopardy_bundles/webpack-stats.prod.json'),
        }
}

#-----AWS Cloudfront Settings Using Boto and django-storages-----

"""Possible way to make pages load faster. Cons: won't immediately show updates to pages. Will keep commented until further learning

AWS_HEADERS = {  # see http://developer.yahoo.com/performance/rules.html#expires
        'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
        'Cache-Control': 'max-age=94608000',
    }"""

AWS_STORAGE_BUCKET_NAME = os.environ['BUCKET_NAME']
AWS_ACCESS_KEY_ID = os.environ['S3_ACCESS_ID']
AWS_SECRET_ACCESS_KEY = os.environ['S3_SECRET_KEY']
AWS_CLOUDFRONT_DOMAIN = os.environ['CLOUDFRONT_DOMAIN']

MEDIAFILES_LOCATION = 'media'
MEDIA_ROOT = '/%s/' % MEDIAFILES_LOCATION
MEDIA_URL = '//%s/%s/' % (AWS_CLOUDFRONT_DOMAIN, MEDIAFILES_LOCATION)
DEFAULT_FILE_STORAGE = 'isaacwebsite.custom_storages.MediaStorage'

STATICFILES_LOCATION = 'static'
STATIC_ROOT = '/%s/' % STATICFILES_LOCATION
STATIC_URL = '//%s/%s/' % (AWS_CLOUDFRONT_DOMAIN, STATICFILES_LOCATION)
STATICFILES_STORAGE = 'isaacwebsite.custom_storages.StaticStorage'