# NextJS GraphQL Auth

### Authentication system boilerplate application using NextJS, GraphQL, MongoDB, and Nginx

_You will need a .env file in the server directory with the following environment variables_

```
MONGO_URI - URI pointing to your mongodb instance
CLIENT_URI - Client side URI
JWT_SECRET - Secret for jsonwebtoken
PORT - GraphQL server port
MAIL_HOST - Mail trap host
MAIL_PORT - Mail trap port
MAIL_USER - Mail trap user
MAIL_PASS - Mail trap password
```

To run in development mode

```sh
$ docker-compose up
```

**NOTE: There is a production deployment pipeline setup with TravisCI, DockerHub, and AWS Elastic Beanstalk. I can supply full instructions if needed to get you setup for the production deployment pipeline**
