FROM nginx

COPY ./dist /var/www/app

COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf
