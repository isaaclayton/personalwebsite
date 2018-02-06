from django.contrib import admin
from django.db import models
#from tinymce.widgets import TinyMCE
from .models import Post

admin.site.register(Post)

