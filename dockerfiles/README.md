# Docker

Execute one of the following steps to have the application running on http://localhost:8080.

## Running with docker compose (recommended)

```sh
$ docker-compose -f dockerfiles/docker-compose.yml up --build
```

## Running with docker

```sh
$ APP_VERSION=$(node -e "console.log(require('./package.json').version);")
$ docker build \
  -f dockerfiles/Dockerfile . \
  -t ts-back-fastify:"$APP_VERSION"
```

```sh
$ docker image list
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
ts-back-fastify        0.0.1     6770c550a346   7 minutes ago   313MB
```

```sh
$ docker run ts-back-fastify:0.0.1 ls -la /app/
$ docker run -d -p 8080:3000 ts-back-fastify:0.0.1
$ docker logs f6c230f29ec...
$ docker kill f6c230f29ec...
```
