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

class Messages extends Component {
  render() {
    return (
      <Query query={MESSAGES}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return <MessageList data={data} />;
        }}
      </Query>
    );
  }
}

export default Messages;
