#from django.shortcuts import render
from django.views import generic
from django.utils import timezone

from .models import Post

class PostListView(generic.ListView):
    template_name = 'blog/index.html'
    context_object_name = 'latest_post_list'
    
    def get_queryset(self):
        """Return the last five published blog posts"""
        return Post.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]
    
class PostView(generic.DetailView):
    model = Post
    slug_field = 'slug'
    template_name = 'blog/detail.html'
    
    def get_queryset(self):
        """
        Excludes any blog posts that aren't published yet.
        """
        return Post.objects.filter(pub_date__lte=timezone.now())