from django.db import models
from django.utils import timezone
#from .admin import MyModelAdmin

class Post(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=40)
    #body = "/blogposts/{}.html".format(title)
    created_date = models.DateTimeField(default=timezone.now)
    pub_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.pub_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title