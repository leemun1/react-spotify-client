import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";
import { startGetAccessToken } from "../actions/auth";
import { startGetCategories } from "../actions/category";

class App extends Component {
  state = {
    accessToken: "",
    categories: [],
    filter: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAccessToken();
    this.props.getCategories(this.constructRequestHeader());
  }

  componentWillReceiveProps(nextProps) {
    const { accessToken, categories, getCategories } = this.props;

    const newCategories = nextProps.categories;

    if (newCategories.length !== categories.length) {
      getCategories();
    }

    this.setState({
      accessToken,
      categories
    });
  }

  constructRequestHeader = () => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    return { headers: { Authorization: "Bearer " + accessToken } };
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const categoriesToShow = this.state.categories.filter(category =>
      category.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return categoriesToShow ? (
      <div className="App">
        <Header accessToken={this.props.accessToken} />
        <Categories
          categories={categoriesToShow}
          handleFilterChange={this.handleFilterChange}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = ({ accessToken, categories }) => ({
  accessToken,
  categories
});

const mapDispatchToProps = dispatch => ({
  getAccessToken: () => dispatch(startGetAccessToken()),
  getCategories: requestHeader => dispatch(startGetCategories(requestHeader))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
