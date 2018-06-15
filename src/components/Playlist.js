import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class Playlist extends Component {
  state = {
    playlist: {},
    image: {},
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
          playlist
        });
      });

    fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}/images`,
      requestHeader
    )
      .then(response => response.json())
      .then(images => {
        this.setState({
          image: images[0]
        });
      });

    fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}/tracks`,
      requestHeader
    )
      .then(response => response.json())
      .then(tracks => {
        this.setState({ tracks: tracks.items });
      });
  }

  render() {
    if (this.state.playlist) {
      return (
        <div className="App">
          <img src={this.state.image.url} alt="playlist" />
          <h1> {this.state.playlist.name}</h1>
          <div>{this.state.playlist.description}</div>
          <table>
            <thead>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Duration</th>
            </thead>

            <tbody>
              {this.state.tracks.map(trackObj => {
                console.log(trackObj);
                return (
                  <tr key={trackObj.track.id}>
                    <td>{trackObj.track.name}</td>
                    <td>{trackObj.track.artists[0].name}</td>
                    <td>{trackObj.track.album.name}</td>
                    <td>
                      {moment(trackObj.track.duration_ms).format("mm:ss")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul />
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
