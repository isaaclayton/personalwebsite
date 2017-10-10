"""isaacwebsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin

#from filebrowser.sites import site
#from filebrowser.storage import S3BotoStorageMixin
#from django.core.files.storage import default_storage

#if FileSystemStorageMixin not in default_storage.__bases__:
#    default_storage.__bases__ += (FileSystemStorageMixin,)

#site.storage = default_storage

urlpatterns = [
    #url(r'^admin/filebrowser/', include(site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include('home.urls')),
    url(r'^blog/', include('blog.urls')),
    #url(r'^tinymce/', include('tinymce.urls')),
]
