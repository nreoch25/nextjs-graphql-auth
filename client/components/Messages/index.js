import { Component } from "react";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";
import MessageList from "./MessageList";

const MESSAGES = gql`
  query {
    messages {
      _id
      text
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      _id
      text
    }
  }
`;

class Messages extends Component {
  render() {
    return (
      <Query query={MESSAGES}>
        {({ subscribeToMore, data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const subscribeToNewMessages = () =>
            subscribeToMore({
              document: NEW_MESSAGE,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) return;
                const newMessage = subscriptionData.data.newMessage;
                return Object.assign({}, prev, {
                  messages: [newMessage, ...prev.messages]
                });
              }
            });
          return (
            <MessageList
              data={data}
              subscribeToNewMessages={subscribeToNewMessages}
            />
          );
        }}
      </Query>
    );
  }
}

export default Messages;
