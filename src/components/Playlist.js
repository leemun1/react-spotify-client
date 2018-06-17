import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Parser from "html-react-parser";

import Header from "./Header";
import Footer from "./Footer";

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
    // coerce desc to be string to be passed into Parser()
    let desc = String(this.state.playlist.description);
    if (this.state.playlist) {
      return (
        <div className="App">
          <Header accessToken={this.props.accessToken} />
          <div className="playlist">
            <div className="playlist__info">
              <img
                src={this.state.image.url}
                alt="playlist"
                className="playlist__info__img"
              />
              <div className="playlist__info__desc">
                <span>PLAYLIST</span>
                <span> {this.state.playlist.name}</span>
                <span>{Parser(desc)}</span>
              </div>
            </div>
            <table className="playlist__tracks">
              <thead>
                <tr className="playlist__tracks--head">
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Duration</th>
                </tr>
              </thead>

              <tbody>
                {this.state.tracks.map(trackObj => {
                  return (
                    <tr key={trackObj.track.id} className="playlist__track">
                      <td className="playlist__track--title">
                        {trackObj.track.name}
                      </td>
                      <td className="playlist__track--artist">
                        {trackObj.track.artists[0].name}
                      </td>
                      <td className="playlist__track--album">
                        {trackObj.track.album.name}
                      </td>
                      <td className="playlist__track--duration">
                        {moment(trackObj.track.duration_ms).format("mm:ss")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Footer />
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
