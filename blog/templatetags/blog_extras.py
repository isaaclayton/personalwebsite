from django import template

register = template.Library()

@register.filter
def addstr(arg1, arg2):
    """concatenate arg1 & arg2
    Received this idea from https://stackoverflow.com/questions/4386168/how-to-concatenate-strings-in-django-templates
    """
    return str(arg1) + str(arg2)