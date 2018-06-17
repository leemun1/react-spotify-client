import React, { Component } from "react";

export default class Player extends Component {
  state = {
    play: false,
    currentTrack: ""
  };

  play = () => {
    if (this.state.play) {
      this.setState({ play: false });
      this.audio.pause();
    } else {
      this.setState({ play: true });
      this.audio.play();
    }
  };

  componentWillReceiveProps() {
    this.setState({ play: true });
  }

  render() {
    if (this.props.audio !== null) {
      return (
        <div>
          <button onClick={this.play}>Play/pause</button>
          <audio
            src={this.props.audio}
            ref={audio => {
              this.audio = audio;
            }}
          />;
        </div>
      );
    } else {
      return (
        <div>
          <button disabled>No preview</button>
        </div>
      );
    }
  }
}
