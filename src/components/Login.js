import React, { Component } from "react";

export default class Login extends Component {
  handleLogin = () => {
    window.location = window.location.href.includes("localhost")
      ? "http://localhost:8888/login"
      : "https://spotify-leemun1-server.herokuapp.com/login";
  };
  render() {
    return (
      <div className="login">
        <img src="/logo.png" alt="logo" className="login__logo" />
        <div className="login__brand">Melon</div>
        <div className="login__desc">
          Melon helps you find the music that suits your taste perfectly. Browse
          through the Spotify playlists assorted by genres and moods to enjoy
          the right music at the right moment.
        </div>
        <button className="login__button" onClick={this.handleLogin}>
          Sign in with Spotify
        </button>
        <div className="login__link-to-spotify">
          <span>Don't have Spotify yet?</span>
          <span>
            <a href="https://www.spotify.com">Click here</a>
          </span>
        </div>
      </div>
    );
  }
}
