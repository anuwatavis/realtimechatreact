import React, { Component } from "react";
import "./App.css";
import Chatroom from "./chat/Chatroom";
import Chatform from "./chat/Chatform";
import { Route, Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

class App extends Component {
  state = {
    name: "ChatApp",
  };

  onNameChange = (name) => {
    this.setState({ name: name });
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Runrena Chat</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Chat</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Route exact path="/" component={Chatform} />
        <Route path="/chatroom" component={Chatroom} />
      </div>
    );
  }
}

export default App;
