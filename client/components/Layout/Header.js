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
import Signout from "../Auth/Signout";

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
                <NavItem>
                  <Link href="/protected">
                    <NavLink style={{ cursor: "pointer" }}>Protected</NavLink>
                  </Link>
                </NavItem>
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
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link href="/password">
                            <a
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "#212529"
                              }}
                            >
                              Reset password
                            </a>
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Fragment>
                )}
                {me && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {me.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <Signout />
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link href="/password">
                          <a
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                              color: "#212529"
                            }}
                          >
                            Reset password
                          </a>
                        </Link>
                      </DropdownItem>
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
