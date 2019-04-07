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
import { CURRENT_USER_QUERY } from "../Auth/User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    signupUser(
      email: $email
      username: $username
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      token
    }
  }
`;

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    mutationComplete: false
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation
        update={(store, { data: { signupUser } }) => {
          if (signupUser.token) {
            localStorage.setItem("token", signupUser.token);
          }
        }}
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={() => this.setState({ mutationComplete: true })}
      >
        {(signupUser, { data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
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
                        this.setState({
                          username: "",
                          email: "",
                          password: "",
                          passwordConfirm: ""
                        });
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
                      <FormGroup>
                        <Input
                          type="password"
                          name="passwordConfirm"
                          placeholder="Confirm Password"
                          value={this.state.passwordConfirm}
                          onChange={this.saveToState}
                        />
                      </FormGroup>
                      <Button type="submit" color="primary" block>
                        Sign up
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
                        User successfully signed up
                      </Alert>
                    </CardFooter>
                  )}
                </Card>
              </Col>
            </Row>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
