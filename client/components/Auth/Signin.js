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

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      username
      email
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };
  saveToState = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signinUser, { error, loading }) => (
          <Row style={{ paddingTop: "100px" }}>
            <Col
              sm="12"
              md={{ size: 8, offset: 2 }}
              lg={{ size: 6, offset: 3 }}
            >
              <Card>
                <CardHeader className="text-center">Sign in</CardHeader>
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
              </Card>
            </Col>
          </Row>
        )}
      </Mutation>
    );
  }
}

export default Signin;
