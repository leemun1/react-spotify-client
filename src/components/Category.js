import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import Empty from "./Empty";

// Redux
import { startGetPlaylists } from "../actions/playlist";

class Category extends Component {
  state = {
    category: { id: "", name: "" },
    playlists: [
      {
        id: "",
        name: "",
        images: [
          {
            url: ""
          }
        ]
      }
    ],
    filter: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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
    category && getPlaylists(requestHeader, category.id);
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
      <div className="App">
        <Header accessToken={this.props.accessToken} />
        <section className="playlists">
          <h1 className="playlists__title">Step 2: Pick a Playlist</h1>
          <h3 className="playlists__subtitle">
            Here are the associated playlists for:{" "}
            <strong>{category.name}</strong>
          </h3>
          <h3 className="playlists__subtitle">
            Select a playlist from below to check out its tracks!
          </h3>
          <div className="playlists__control">
            <span className="playlists__control--name">{category.name}</span>
            <span className="playlists__control--length">
              Showing <strong>{playlistsToShow.length}</strong> playlists
            </span>
            <Search handleFilterChange={this.handleFilterChange} />
          </div>
          <ul className="playlists__grid">
            {playlistsToShow.length !== 0 ? (
              playlistsToShow.map(playlist => (
                <Link
                  to={`/category/${category.id}/${playlist.id}`}
                  key={playlist.id}
                >
                  <li className="playlists__grid__item">
                    <img src={playlist.images[0].url} alt="playlist" />
                  </li>
                </Link>
              ))
            ) : (
              <Empty />
            )}
          </ul>
        </section>
        <Footer />
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
