from django.conf.urls import url

from . import views

app_name = 'projects'
urlpatterns = [
    #ex: /blog/
    url(r'^$', views.ProjectListView.as_view(), name='project_list'),
    url(r'^(?P<slug>[\w.-]+)/$', views.ProjectView.as_view(), name="project"),
]