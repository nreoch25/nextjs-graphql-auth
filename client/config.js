export const endpoint = process.browser
  ? "http://nextjsgraphqlauth-env.hgdpaicmfm.us-east-2.elasticbeanstalk.com/graphql"
  : "http://nginx/graphql";

//? "http://nextjsgraphqlauth-env.hgdpaicmfm.us-east-2.elasticbeanstalk.com/graphql"

const env = process.env.NODE_ENV || "development";
export const config = {
  development: { test: "dev" },
  production: { test: "prod" }
}[env];
