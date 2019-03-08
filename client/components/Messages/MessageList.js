import { Component } from "react";

class MessageList extends Component {
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }
  render() {
    const { data } = this.props;
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.messages.map(message => {
          return <li key={message._id}>{message.text}</li>;
        })}
      </ul>
    );
  }
}

export default MessageList;
