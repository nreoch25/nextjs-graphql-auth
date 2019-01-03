import { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ""
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading }) => (
          <Row style={{ paddingTop: "100px" }}>
            <Col
              sm="12"
              md={{ size: 8, offset: 2 }}
              lg={{ size: 6, offset: 3 }}
            >
              <Card>
                <CardHeader className="text-center">
                  Request Password reset
                </CardHeader>
                <CardBody>
                  <Form
                    method="post"
                    onSubmit={async evt => {
                      evt.preventDefault();
                      await requestReset();
                      this.setState({ email: "" });
                    }}
                  >
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.saveToState}
                      />
                    </FormGroup>
                    <Button type="submit" color="primary" block>
                      Request reset
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
