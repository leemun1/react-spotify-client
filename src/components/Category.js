import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Search from "./Search";
import { startGetPlaylists } from "../actions/playlist";

class Category extends Component {
  state = {
    category: {},
    playlists: [],
    filter: ""
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

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const { category } = this.state;
    const playlistsToShow = this.state.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <h1>Playlists for {category.name}</h1>
        <Search handleFilterChange={this.handleFilterChange} />
        {playlistsToShow.map(playlist => (
          <Link
            to={`/category/${category.id}/${playlist.id}`}
            key={playlist.id}
          >
            <li>
              <img src={playlist.images[0].url} alt="playlist" />
              {playlist.name}
            </li>
          </Link>
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
