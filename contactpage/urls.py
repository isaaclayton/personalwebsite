from django.contrib import admin
from django.conf.urls import url

from . import views

app_name = 'contact'
urlpatterns = [
    url(r'^$', views.emailView, name='email'),
    url(r'success/', views.successView, name='success'),
]