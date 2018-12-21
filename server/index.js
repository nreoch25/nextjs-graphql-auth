const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
// use cookie parser to populate current user
app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = _id;
  }
  next();
});

const typeDefs = gql(
  fs.readFileSync("./graphql/schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./graphql/resolvers");

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    User,
    req,
    res
  })
});

graphqlServer.applyMiddleware({
  app,
  path: "/graphql",
  cors: { origin: "http://localhost:3000", credentials: true }
});

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log(`MongoDB connected at ${process.env.MONGO_URI}`))
  .catch(error => console.error(error));

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
