# NextJS GraphQL Auth

### Authentication system boilerplate application using NextJS, GraphQL, MongoDB, and Nginx

_You will need a .env file in the server directory with the following environment variables_

```
MONGO_URI  - URI pointing to your mongodb instance
CLIENT_URI - Client side URI
JWT_SECRET - Secret for jsonwebtoken
PORT       - GraphQL server port
MAIL_HOST  - Mailtrap host
MAIL_PORT  - Mailtrap port
MAIL_USER  - Mailtrap user
MAIL_PASS  - Mailtrap password
```

To run in development mode

```sh
$ docker-compose up
```

**NOTE: There is a production deployment pipeline setup with TravisCI, DockerHub, and Kubernetes that runs in a Minikube cluster. I can supply full instructions if needed to get you setup for the production deployment pipeline**
