FROM node:lts-alpine

COPY . /app

WORKDIR /app

ENTRYPOINT [ "/usr/local/bin/npm", "run", "serve", "--" ]