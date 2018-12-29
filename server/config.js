const env = process.env.NODE_ENV || "local";
const config = {
  development: {
    origin: "http://localhost",
    mongoURI: "mongodb://db:27017/graphql-auth"
  }
}[env];

module.exports = config;
