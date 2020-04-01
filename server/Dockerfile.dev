FROM node:10.15-alpine
RUN apk update && apk --no-cache add --virtual builds-deps build-base python tini
WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean --force
COPY . .
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["yarn", "dev"]