from django import template

register = template.Library()

@register.simple_tag
def include_fallback(*template_choices):
    t = template.loader.select_template(template_choices)
    return t.render()

@register.filter
def addstr(arg1, arg2):
    """concatenate arg1 & arg2
    Received this idea from https://stackoverflow.com/questions/4386168/how-to-concatenate-strings-in-django-templates
    """
    return str(arg1) + str(arg2)