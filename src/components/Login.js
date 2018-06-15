import React, { Component } from "react";

export default class Login extends Component {
  handleLogin = () => {
    window.location = window.location.href.includes("localhost")
      ? "http://localhost:8888/login"
      : "https://spotify-leemun1-server.herokuapp.com/login";
  };
  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>Sign in with Spotify</button>
      </div>
    );
  }
}
