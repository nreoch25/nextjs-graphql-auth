import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, config } from "../config";

function createClient({ headers }) {
  console.log("test env", config.test);
  return new ApolloClient({
    uri: endpoint,
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
