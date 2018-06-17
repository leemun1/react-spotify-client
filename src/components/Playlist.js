import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Parser from "html-react-parser";

import Header from "./Header";
import Footer from "./Footer";
import Player from "./Player";

class Playlist extends Component {
  state = {
    playlist: {
      name: "",
      description: ""
    },
    image: "",
    tracks: [
      {
        track: {
          id: "",
          name: "",
          artists: [
            {
              name: ""
            }
          ],
          album: {
            name: ""
          },
          duration: "",
          preview_url: ""
        }
      }
    ],
    error: null
  };
  componentDidMount() {
    this.listenForPlay();

    let { accessToken } = this.props;

    // if no accessToken, redirect to login page
    if (!accessToken) {
      this.props.history.push("/");
    }

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
      })
      .catch(error => {
        this.setState({
          error
        });
      });

    fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}/images`,
      requestHeader
    )
      .then(response => response.json())
      .then(images => {
        this.setState({
          image: images[0].url
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });

    fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}/tracks`,
      requestHeader
    )
      .then(response => response.json())
      .then(tracks => {
        this.setState({ tracks: tracks.items });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  audioPauser = e => {
    console.log("playing new track!");
    var audios = document.getElementsByTagName("audio");
    for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] !== e.target) {
        audios[i].pause();
      }
    }
  };

  listenForPlay = () => {
    document.addEventListener("play", this.audioPauser, true);
  };

  componentWillUnmount() {
    document.removeEventListener("play", this.audioPauser);
  }

  render() {
    const { playlist, image, tracks, error } = this.state;
    const { accessToken, history } = this.props;
    // coerce desc to be string to be passed into Parser()
    let desc = String(playlist.description);

    // if error during API calls, redirect to login page
    if (error) {
      history.push("/");
    }

    return (
      <div className="App">
        <Header accessToken={accessToken} />
        <div className="playlist">
          <div className="playlist__info">
            <img src={image} alt="playlist" className="playlist__info__img" />
            <div className="playlist__info__desc">
              <span>PLAYLIST</span>
              <span> {playlist.name}</span>
              <span>{Parser(desc)}</span>
            </div>
          </div>
          <table className="playlist__tracks">
            <thead>
              <tr className="playlist__tracks--head">
                <th>{""}</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map(obj => {
                return (
                  <tr key={obj.track.id} className="playlist__track">
                    <td className="playlist__track--play">
                      <Player audio={obj.track.preview_url} />
                    </td>
                    <td className="playlist__track--title">{obj.track.name}</td>
                    <td className="playlist__track--artist">
                      {obj.track.artists[0].name}
                    </td>
                    <td className="playlist__track--album">
                      {obj.track.album.name}
                    </td>
                    <td className="playlist__track--duration">
                      {moment(obj.track.duration_ms).format("mm:ss")}
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
