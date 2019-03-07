import { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
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
    email: "",
    mutationCompleted: false
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        onCompleted={() => this.setState({ mutationComplete: true })}
      >
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
                {error && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {error.message}
                    </Alert>
                  </CardFooter>
                )}
                {this.state.mutationComplete && !error && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Please check your email for a reset link
                    </Alert>
                  </CardFooter>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
