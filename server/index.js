const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const typeDefs = gql(
  fs.readFileSync("./graphql/schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./graphql/resolvers");

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { User }
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
