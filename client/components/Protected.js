import { Component, Fragment } from "react";
import MessageForm from "./Messages/MessageForm";
import Messages from "./Messages";
import { Row, Col } from "reactstrap";

class Protected extends Component {
  render() {
    return (
      <Fragment>
        <Row style={{ paddingTop: "30px" }}>
          <Col>
            <MessageForm />
          </Col>
        </Row>
        <Row style={{ paddingTop: "30px" }}>
          <Col>
            <Messages />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Protected;
