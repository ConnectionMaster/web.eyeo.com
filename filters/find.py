from jinja2 import environmentfilter


@environmentfilter
def find(environment, sequence, value, attribute=None):
    for item in sequence:
        if (item if attribute is None else environment.getitem(item, attribute)) == value:
            return item
    return None
