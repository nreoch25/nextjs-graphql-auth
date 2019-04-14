const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    clientEndpoint: "http://localhost/graphql",
    serverEndpoint: "http://nginx/graphql",
    wsEndpoint: "ws://localhost/graphql"
  },
  production: {
    clientEndpoint: "http://192.168.55.141/graphql",
    serverEndpoint: "http://192.168.55.141/graphql",
    wsEndpoint: "ws://192.168.55.141/graphql"
  }
}[env];

export default config;
