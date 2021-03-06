import React, { Component } from "react";

export default class Player extends Component {
  state = { play: false };

  componentDidMount() {
    this.setState({ play: false });
    this.audio.addEventListener("pause", this.listenForPause);
  }

  listenForPause = () => {
    console.log("track paused");
    this.setState({ play: false });
  };

  play = () => {
    if (this.state.play) {
      this.audio.pause();
      this.setState({ play: false });
    } else {
      this.audio.play();
      this.setState({ play: true });
    }
  };

  render() {
    return (
      <div className="player">
        <button
          className="player__button"
          onClick={this.play}
          disabled={this.props.audio === null && true}
        >
          <span>
            {!this.state.play ? (
              <i className="far fa-play-circle" />
            ) : (
              <i className="fas fa-pause-circle" />
            )}
          </span>
        </button>
        <audio
          src={this.props.audio}
          ref={audio => {
            this.audio = audio;
          }}
        />
      </div>
    );
  }
}
