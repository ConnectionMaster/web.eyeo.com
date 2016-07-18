FROM debian
MAINTAINER saroyanm

# Obligatoric dependency installation via APT package manager
RUN apt-get -y update && apt-get -y install \
  mercurial \
  nginx \
  python \
  python-flup \
  python-pip

# 3rd party Python dependencies not available as APT package
RUN pip install Jinja2==2.8 markdown==2.6.6

# Dependencies provided within Adblock Plus repositories
RUN hg clone https://hg.adblockplus.org/cms/ /opt/cms
RUN hg clone https://hg.adblockplus.org/sitescripts/ /opt/sitescripts

# Ensure the generate_static_pages target directory is present
RUN mkdir -p /var/www

# TODO: Find a way to build from local source in development
#RUN hg clone https://hg.adblockplus.org/web.eyeo.com /var/lib/web.eyeo.com
ADD . /var/lib/web.eyeo.com

# Application-specific Nginx configuration, i.e. redirects and -writes
RUN ln -s /var/lib/web.eyeo.com/server/nginx.conf /etc/nginx/sites-available/eyeo.com
RUN ln -s ../sites-available/eyeo.com /etc/nginx/sites-enabled/eyeo.com
RUN rm /etc/nginx/sites-enabled/default

ENV PYTHONPATH=/opt/cms:/opt/sitescripts
RUN python -m cms.bin.generate_static_pages /var/lib/web.eyeo.com /var/www/eyeo.com

# By default the container will run Nginx (in foreground)
CMD nginx -g "daemon off;"
