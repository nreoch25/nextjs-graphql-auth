const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    clientEndpoint: "http://localhost/graphql",
    serverEndpoint: "http://nginx/graphql"
  },
  production: {
    clientEndpoint:
      "http://nextjsgraphqlauth-env.hgdpaicmfm.us-east-2.elasticbeanstalk.com/graphql",
    serverEndpoint: "http://nginx/graphql"
  }
}[env];

export default config;
