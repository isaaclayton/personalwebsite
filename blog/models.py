from django.db import models
from django.utils import timezone
from datetime import datetime  
from django.contrib.auth.models import User
#from .admin import MyModelAdmin

class Post(models.Model):
    author = models.ForeignKey(User)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=40)
    #body = "/blogposts/{}.html".format(title)
    pub_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.pub_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
    
    def get_date(self):
        time = datetime.now()
        if self.pub_date.day == time.day:
            return str(time.hour - self.pub_date.hour) + " hours ago"
        else:
            if self.pub_date.month == time.month:
                return str(time.day - self.pub_date.day) + " days ago"
            else:
                if self.pub_date.year == time.year:
                    return str(time.month - self.pub_date.month) + " months ago"
                else:
                    return str(time.year - self.pub_date.year) + " years ago"
        return self.pub_date