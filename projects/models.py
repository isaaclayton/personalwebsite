from django.db import models
from django.utils import timezone
from datetime import datetime
from django.contrib.auth.models import User
#from .admin import MyModelAdmin

class Project(models.Model):
    author = models.ForeignKey(User, models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=40, blank=True, null=True)
    #body = "/blogposts/{}.html".format(title)
    pub_date = models.DateTimeField(blank=True, null=True)
    external_link = models.CharField(blank=True, null=True, max_length=200)

    def publish(self):
        self.pub_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
    
    def get_date(self):
        time = datetime.now()
        if self.pub_date.day == time.day:
            if (time.hour - self.pub_date.hour)==1:
                return str(time.hour - self.pub_date.hour) + " hour ago"
            else:
                return str(time.hour - self.pub_date.hour) + " hours ago"
        else:
            if self.pub_date.month == time.month:
                if (time.day - self.pub_date.day)==1:
                    return str(time.day - self.pub_date.day) + " day ago"
                else:
                    return str(time.day - self.pub_date.day) + " days ago"
            else:
                if self.pub_date.year == time.year:
                    if (time.month - self.pub_date.month)==1:
                        return str(time.month - self.pub_date.month) + " month ago"
                    else:
                        return str(time.month - self.pub_date.month) + " months ago"
                else:
                    if (time.year - self.pub_date.year)==1:
                        return str(time.year - self.pub_date.year) + " year ago"
                    else:
                        return str(time.year - self.pub_date.year) + " years ago"
        return self.pub_date