FROM mysql:8.0.3

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=chatroom

COPY mysql-init/chatroom.sql /docker-entrypoint-initdb.d/chatroom.sql

# Taken from https://github.com/docker-library/mysql/blob/6c414e7f38c2079c7193beae5dc7c34ee46cd6e7/8.0/Dockerfile
CMD ["mysqld"]