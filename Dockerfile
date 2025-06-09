FROM nginx:latest

WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/
COPY ./src /usr/share/nginx/html

EXPOSE 80


