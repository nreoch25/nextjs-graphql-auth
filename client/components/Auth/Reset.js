import { Component } from "react";
import PropTypes from "prop-types";
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
import { CURRENT_USER_QUERY } from "../Auth/User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $password: String!
    $passwordConfirm: String!
    $resetToken: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirm: $passwordConfirm
      resetToken: $resetToken
    ) {
      username
      email
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: "",
    passwordConfirm: "",
    mutationCompleted: false
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={() => this.setState({ mutationComplete: true })}
      >
        {(resetPassword, { error, loading }) => (
          <Row style={{ paddingTop: "100px" }}>
            <Col
              sm="12"
              md={{ size: 8, offset: 2 }}
              lg={{ size: 6, offset: 3 }}
            >
              <Card>
                <CardHeader className="text-center">
                  Reset your password
                </CardHeader>
                <CardBody>
                  <Form
                    method="post"
                    onSubmit={async evt => {
                      evt.preventDefault();
                      await resetPassword();
                      this.setState({ password: "", passwordConfirm: "" });
                    }}
                  >
                    <FormGroup>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="passwordConfirm"
                        value={this.state.passwordConfirm}
                        placeholder="Confirm Password"
                        onChange={this.saveToState}
                      />
                    </FormGroup>
                    <Button type="submit" color="primary" block>
                      Reset password
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
                      You have successfully reset your password
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

export default Reset;
