import { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Link from "next/link";
import User from "../Auth/User";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Navbar color="dark" dark expand="md">
            <Link href="/">
              <NavbarBrand href="#">NextJS GraphQL Auth</NavbarBrand>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {!me && (
                  <Fragment>
                    <NavItem>
                      <Link href="/signup">
                        <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link href="/signin">
                        <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                      </Link>
                    </NavItem>
                  </Fragment>
                )}
                {me && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {me.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Sign out</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Account</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        )}
      </User>
    );
  }
}

export default Header;
