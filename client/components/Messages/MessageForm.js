import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Card, CardBody, Button, Form, FormGroup, Input } from "reactstrap";

const POST_MESSAGE = gql`
  mutation postMessage($text: String!) {
    postMessage(text: $text) {
      _id
      text
      sender {
        _id
        username
        email
        password
      }
    }
  }
`;

class MessageForm extends Component {
  render() {
    return (
      <Mutation mutation={POST_MESSAGE}>
        {(postMessage, { data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const handleSubmit = evt => {
            evt.preventDefault();
            const text = evt.target.text.value;
            if (!text) return;
            postMessage({
              variables: {
                text
              }
            });
            evt.target.text.value = "";
          };
          return (
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="text"
                      placeholder="type a message"
                    />
                  </FormGroup>
                  <Button type="submit" color="primary" block>
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}

export default MessageForm;
