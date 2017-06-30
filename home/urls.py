from django.conf.urls import url

from . import views

app_name = 'home'
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^projects/$', views.ProjectsView.as_view(), name='projects'),
]