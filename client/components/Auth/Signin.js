import { Component } from "react";
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

class Signin extends Component {
  render() {
    return (
      <Row style={{ paddingTop: "100px" }}>
        <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader className="text-center">Sign up</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <Button color="primary" block>
                  Sign in
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Signin;
