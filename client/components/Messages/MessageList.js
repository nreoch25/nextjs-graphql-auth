import { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class MessageList extends Component {
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }
  render() {
    const { data } = this.props;
    return (
      <ListGroup>
        {data.messages.map(message => {
          return (
            <ListGroupItem key={message._id}>
              <strong>{message.sender.username}:</strong> {message.text}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

export default MessageList;
