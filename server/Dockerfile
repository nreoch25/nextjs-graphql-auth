FROM node:alpine
RUN apk update && apk --no-cache add --virtual builds-deps build-base python
WORKDIR /app
COPY ./package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "start"]