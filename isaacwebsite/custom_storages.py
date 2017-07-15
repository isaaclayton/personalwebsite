from django.conf import settings
from storages.backends.s3boto import S3BotoStorage
from filebrowser.storage import S3BotoStorageMixin

class StaticStorage(S3BotoStorage, S3BotoStorageMixin):
    """uploads to 'mybucket/static/', serves from 'cloudfront.net/static/'"""
    location = settings.STATICFILES_LOCATION

    def __init__(self, *args, **kwargs):
        kwargs['custom_domain'] = settings.AWS_CLOUDFRONT_DOMAIN
        super().__init__(*args, **kwargs)

class MediaStorage(S3BotoStorage, S3BotoStorageMixin):
    """uploads to 'mybucket/media/', serves from 'cloudfront.net/media/'"""
    location = settings.MEDIAFILES_LOCATION

    def __init__(self, *args, **kwargs):
        kwargs['custom_domain'] = settings.AWS_CLOUDFRONT_DOMAIN
        super().__init__(*args, **kwargs)