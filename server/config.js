const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    origin: "http://localhost",
    mongoURI: "mongodb://db:27017/graphql-auth",
    mailHost: "smtp.mailtrap.io",
    mailPort: 2525,
    mailUser: "b5f32040e1b14c",
    mailPass: "c5e1329801e7c0"
  }
}[env];

module.exports = config;
