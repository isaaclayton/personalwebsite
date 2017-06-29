from django.shortcuts import render
from django.views import generic

# Create your views here.

class IndexView(generic.TemplateView):
    template_name = 'home/index.html'
    
class ProjectsView(generic.TemplateView):
    template_name = 'home/projects.html'