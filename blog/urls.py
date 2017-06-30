from django.conf.urls import url

from . import views

app_name = 'blog'
urlpatterns = [
    #ex: /blog/
    url(r'^$', views.PostListView.as_view(), name='post_list'),
    url(r'^(?P<slug>[\w.-]+)/$', views.PostView.as_view(), name="post"),
]