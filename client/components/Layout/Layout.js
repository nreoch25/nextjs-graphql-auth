import { Component, Fragment } from "react";
import { Container } from "reactstrap";
import Router from "next/router";
import NProgress from "nprogress";
import Header from "./Header";
import Footer from "./Footer";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Container>{this.props.children}</Container>
      </Fragment>
    );
  }
}

export default Layout;
