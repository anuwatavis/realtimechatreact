import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Container, Button } from "reactstrap";
import API from "../service/axiosConfig";
class Chatform extends Component {
  state = {
    name: "",
    password: "",
    loginState: null,
    userData: {},
  };
  componentDidMount = () => {};
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, password } = this.state;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    console.log("sumbmit");
    API.post("/login", formData).then((res) => {
      if (res.data.err === "not member") {
        this.setState({ loginState: "You are not member in runrena" });
      } else if (res.data.err === "password incorrect") {
        this.setState({ loginState: "password incorrect" });
      } else {
        this.setState({ loginState: "Login Success" });
        localStorage.setItem("userId", res.data.userId);
        this.setState({ userData: res.data });
        this.props.history.push("/chatroom");
      }
    });
  };

  render() {
    const { name, password } = this.state;

    return (
      <div>
        <Container>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="username">
                <h1>User Name</h1>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Please enter your name"
                value={name}
                onChange={this.onChange}
              />
              <Label for="password">
                <h1>Password</h1>
              </Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Please enter your password"
                value={password}
                onChange={this.onChange}
              />
            </FormGroup>
            {/* <Link to={{ pathname: "/chatroom", name: name }}>
              <Button block>Join</Button>
            </Link> */}
            <Button block>Join</Button>
          </Form>
          {this.state.loginState ? (
            <Alert color="danger" className="mt-3">
              {this.state.loginState}
            </Alert>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default Chatform;
