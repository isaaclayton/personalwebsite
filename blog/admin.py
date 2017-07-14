from django.contrib import admin
from django.db import models
from tinymce.widgets import TinyMCE
from .models import Post

class MyModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget':TinyMCE(attrs={'cols': 80, 'rows': 30})},
    }
    
admin.site.register(Post, MyModelAdmin)

