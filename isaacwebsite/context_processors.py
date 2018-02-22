# website/context_processors.py
from django.conf import settings


def ga_tracking_id(request):
    """
    Receive Google Analytics tracking ID
    """
    ga_track_id = getattr(settings, 'GA_TRACKING_ID', False)
    if not settings.DEBUG and ga_track_id:
        return {'GA_TRACKING_ID': ga_track_id}
    return {}