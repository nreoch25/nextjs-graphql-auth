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
import { CURRENT_USER_QUERY } from "../Auth/User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signupUser(email: $email, username: $username, password: $password) {
      username
      email
    }
  }
`;

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signupUser, { error, loading }) => (
          <Row style={{ paddingTop: "100px" }}>
            <Col
              sm="12"
              md={{ size: 8, offset: 2 }}
              lg={{ size: 6, offset: 3 }}
            >
              <Card>
                <CardHeader className="text-center">Sign up</CardHeader>
                <CardBody>
                  <Form
                    method="post"
                    onSubmit={async evt => {
                      evt.preventDefault();
                      await signupUser();
                      this.setState({ username: "", email: "", password: "" });
                    }}
                  >
                    <FormGroup>
                      <Input
                        type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Email Address"
                        onChange={this.saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.saveToState}
                      />
                    </FormGroup>
                    <Button type="submit" color="primary" block>
                      Sign up
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

export default Signup;
