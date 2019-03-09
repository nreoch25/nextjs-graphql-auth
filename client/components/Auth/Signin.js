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

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: "",
    mutationComplete: false
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation
        update={(store, { data: { signinUser } }) => {
          if (signinUser.token) {
            localStorage.setItem("token", signinUser.token);
          }
        }}
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={() => this.setState({ mutationComplete: true })}
      >
        {(signinUser, { error, loading }) => (
          <Row style={{ paddingTop: "100px" }}>
            <Col
              sm="12"
              md={{ size: 8, offset: 2 }}
              lg={{ size: 6, offset: 3 }}
            >
              <Card>
                <CardHeader className="text-center">
                  {this.props.text}
                </CardHeader>
                <CardBody>
                  <Form
                    method="post"
                    onSubmit={async evt => {
                      evt.preventDefault();
                      await signinUser();
                      this.setState({ email: "", password: "" });
                    }}
                  >
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
                      Sign in
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
                      User successfully signed in
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

export default Signin;
