import React, { Component } from "react";
import { connect } from "react-redux";

import { startGetPlaylists } from "../actions/playlist";

class Category extends Component {
  state = {
    category: {},
    playlists: []
  };

  componentDidMount() {
    this.handleGetPlaylists();
    let category = this.findMatchedCategory();
    this.setState({ category });
  }

  componentWillReceiveProps(nextProps) {
    let { playlists } = this.props;
    const newPlaylists = nextProps.playlists;

    if (playlists.length === 0) {
      this.handleGetPlaylists();
    } else if (newPlaylists[0].id !== playlists[0].id) {
      this.handleGetPlaylists();
    }

    this.setState({ playlists });
  }

  handleGetPlaylists = () => {
    let { accessToken, getPlaylists } = this.props;
    let category = this.findMatchedCategory();
    let requestHeader = {
      headers: { Authorization: "Bearer " + accessToken }
    };
    getPlaylists(requestHeader, category.id);
  };

  findMatchedCategory = () => {
    let { categories } = this.props;
    let id = this.props.match.params.id;
    return categories.find(category => category.id === id);
  };

  render() {
    const { category, playlists } = this.state;
    return (
      <div>
        <h1>Playlists for {category.name}</h1>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            <img src={playlist.images[0].url} alt="playlist" />
            {playlist.name}
          </li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ accessToken, categories, playlists }) => ({
  accessToken,
  categories,
  playlists
});

const mapDispatchToProps = dispatch => ({
  getPlaylists: (requestHeader, category) =>
    dispatch(startGetPlaylists(requestHeader, category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
