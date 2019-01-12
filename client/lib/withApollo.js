import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import config from "../config";

function createClient({ headers }) {
  return new ApolloClient({
    uri: config.endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);
