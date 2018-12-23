FROM node:alpine
WORKDIR /app
COPY ./package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "dev"]