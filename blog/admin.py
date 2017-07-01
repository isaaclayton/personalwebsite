from django.contrib import admin
from django.db import models
#from django-tinymce import TinyMCE

from .models import Post

admin.site.register(Post)

#formfield_overrides = {
#    models.TextField: {'widget': TinyMCE(attrs={'cols': 80, 'rows': 30})},
#}