const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    endpoint: process.env.browser
      ? "http://localhost/graphql"
      : "http://nginx/graphql"
  },
  production: {
    endpoint: process.env.browser
      ? "http://nextjsgraphqlauth-env.hgdpaicmfm.us-east-2.elasticbeanstalk.com/graphql"
      : "http://nginx/graphql"
  }
}[env];

export default config;
