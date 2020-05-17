import React, { Component } from "react";

class MessageForm extends Component {
  state = {
    message: "",
    userName: this.props.currentMember,
  };

  onSubmit = (e) => {
    e.preventDefault();
    // send message
    this.props.onMessageSend({
      message: this.state.message,
      userName: this.state.userName,
    });
    this.setState({ message: "" });
  };

  onChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div className="mt-3">
        <form onSubmit={this.onSubmit} className="MessageForm">
          <input className="MessageInput" type="text" value={this.state.text} onChange={this.onChange} />
          <button className="MessageButton">Send</button>
        </form>
      </div>
    );
  }
}

export default MessageForm;
