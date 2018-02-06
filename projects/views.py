#from django.shortcuts import render
from django.views import generic
from django.utils import timezone

from .models import Project

class ProjectListView(generic.ListView):
    template_name = 'projects/index.html'
    context_object_name = 'latest_project_list'
    
    def get_queryset(self):
        """Return the last five published project posts"""
        return Project.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]
    
class ProjectView(generic.DetailView):
    model = Project
    slug_field = 'slug'
    template_name = 'projects/detail.html'
    
    def get_queryset(self):
        """
        Excludes any project posts that aren't published yet.
        """
        return Project.objects.filter(pub_date__lte=timezone.now())