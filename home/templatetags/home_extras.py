from django import template

register = template.Library()

@register.simple_tag
def include_fallback(*template_choices):
    t = template.loader.select_template(template_choices)
    return t.render()