import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import config from "../config";

const endpoint = process.browser
  ? config.clientEndpoint
  : config.serverEndpoint;

function createClient({ headers }) {
  const cache = new InMemoryCache();
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      },
      headers
    });
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: endpoint
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: config.wsEndpoint,
        options: {
          reconnect: true,
          connectionParams: () => {
            const token = localStorage.getItem("token");
            if (token) {
              return { authToken: token };
            }
            return {};
          }
        }
      })
    : () => {
        console.log("SSR");
      };

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === "OperationDefinition" &&
        operation === "subscription" &&
        process.browser
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache,
    link: authLink.concat(link)
  });
}

export default withApollo(createClient);

// const endpoint = process.browser
//   ? config.clientEndpoint
//   : config.serverEndpoint;

// function createClient() {
//   const cache = new InMemoryCache();
//   const httpLink = new HttpLink({
//     uri: endpoint,
//     credentials: "same-origin"
//   });
//   const wsLink = process.browser
//     ? new WebSocketLink({
//         uri: "ws://localhost/graphql",
//         options: {
//           reconnect: true
//         }
//       })
//     : () => {
//         console.log("SSR");
//       };
//   const link = split(
//     ({ query }) => {
//       const { kind, operation } = getMainDefinition(query);
//       return (
//         kind === "OperationDefinition" &&
//         operation === "subscription" &&
//         process.browser
//       );
//     },
//     wsLink,
//     httpLink
//   );

//   return new ApolloClient({
//     link,
//     cache
//   });
// }
