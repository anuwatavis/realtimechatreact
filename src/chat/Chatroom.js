import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { Redirect } from "react-router-dom";
import { Button, Container } from "reactstrap";
import API from "../service/axiosConfig";
class Chatroom extends Component {
  state = {
    userName: null,
    logoutState: false,
    socket: null,
    messages: [],
    loaded: false,
  };

  componentDidMount() {
    if (this.state.socket == null) {
      const socket = socketIOClient("http://localhost:8080");
      socket.on("message", (message) => {
        this.updateMessage(message);
      });
      this.setState({ socket: socket });
    }
    let url = "/user/" + localStorage.userId;
    if (localStorage.length !== 0) {
      API.get(url).then((res) => {
        this.setState({ userName: res.data[0].userName });
      });
      API.get("/message").then((res) => {
        this.addMessage(res.data);
      });
    }
  }

  onMessageSend = (message) => {
    let formData = new FormData();
    formData.append("userId", localStorage.userId);
    formData.append("message", message.message);
    API.post("/message", formData).then((res) => {
      this.updateMessage(message);
      this.state.socket.emit("emit", { ...message });
    });
  };

  updateMessage = (message) => {
    this.setState({ messages: [{ ...message }, ...this.state.messages] });
  };
  addMessage = (message) => {
    this.setState({ messages: message });
  };
  handelOnclick = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.setState({ logoutState: true });
  };
  render() {
    const { userName } = this.state;
    if (localStorage.length === 0) {
      return <Redirect to="/" />;
    }
    if (this.state.logoutState === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container>
          <h1>{this.state.userName}</h1>
          <div className="chat">{this.state.messages ? <MessageList messages={this.state.messages} /> : null}</div>
          {this.state.userName ? <MessageForm onMessageSend={this.onMessageSend} currentMember={userName} /> : null}
          <Button block onClick={this.handelOnclick}>
            Exit Chat Room
          </Button>
        </Container>
      </div>
    );
  }
}

export default Chatroom;
