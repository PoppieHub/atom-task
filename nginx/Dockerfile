FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y nginx wget gettext

COPY ./hosts/atom-task.client.conf /etc/nginx/sites-enabled/atom-task.client.conf

# Открываем порт 80 для nginx
EXPOSE 80

# Команда для запуска nginx в режиме daemon off
CMD ["nginx", "-g", "daemon off;"]