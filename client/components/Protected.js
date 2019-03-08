import { Component, Fragment } from "react";
import MessageForm from "./Messages/MessageForm";
import { Row, Col } from "reactstrap";

class Protected extends Component {
  render() {
    return (
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <MessageForm />
        </Col>
      </Row>
    );
  }
}

export default Protected;
