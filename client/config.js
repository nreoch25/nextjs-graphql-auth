export const endpoint = process.browser
  ? "http://localhost/graphql"
  : "http://nginx/graphql";
