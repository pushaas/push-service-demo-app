########################################
# stage 1: build web app
########################################
FROM node:10.16.0-alpine as web-builder

WORKDIR /app

COPY client/package.json .
COPY client/yarn.lock .
RUN yarn

COPY ./client .
RUN rm -fr build && yarn build

########################################
# stage 2: run
########################################
FROM node:10.16.0-alpine

WORKDIR /app

EXPOSE 8888

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
COPY --from=web-builder /app/build ./client/build

ENTRYPOINT ["yarn", "start"]
