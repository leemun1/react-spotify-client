import React, { Component } from "react";
import { connect } from "react-redux";

class Playlist extends Component {
  state = {
    playlist: {},
    tracks: []
  };
  componentDidMount() {
    let { accessToken } = this.props;
    let requestHeader = {
      headers: { Authorization: "Bearer " + accessToken }
    };

    let id = this.props.match.params.id;

    fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}`,
      requestHeader
    )
      .then(response => response.json())
      .then(playlist => {
        this.setState({
          playlist,
          tracks: playlist.tracks.items
        });
      });
  }

  render() {
    if (this.state.playlist) {
      return (
        <div>
          <h1>This is a playlist</h1>
          {this.state.playlist.name}
          <ul>
            {this.state.tracks.map(trackObj => (
              <li key={trackObj.track.id}>{trackObj.track.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = ({ accessToken }) => ({
  accessToken
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
