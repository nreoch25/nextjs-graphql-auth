const env = process.env.NODE_ENV || "local";
const config = {
  local: {
    origin: "http://localhost:3000",
    mongoURI: "mongodb://localhost:27017/graphql-auth"
  },
  development: {
    origin: "http://localhost",
    mongoURI: "mongodb://db:27017/graphql-auth"
  },
  production: {
    origin: "http://localhost",
    mongoURI: "mongodb://db:27017/graphql-auth"
  }
}[env];

module.exports = config;
