import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";
import { startGetCategories } from "../actions/category";

class App extends Component {
  state = {
    accessToken: "",
    user: {},
    categories: this.props.categories,
    filter: ""
  };

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    this.setState({ accessToken });

    const requestHeader = {
      headers: { Authorization: "Bearer " + accessToken }
    };

    if (!accessToken) {
      return;
    }

    this.props.getCategories(requestHeader);
  }

  componentWillReceiveProps(nextProps) {
    const { categories, getCategories } = this.props;
    const newCategories = nextProps.categories;

    // re-render if new note item added
    if (newCategories.length !== categories.length) {
      getCategories();
    }
  }

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const categoriesToShow = this.props.categories.filter(category =>
      category.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return categoriesToShow ? (
      <div className="App">
        <Header />
        <Categories
          categories={categoriesToShow}
          handleFilterChange={this.handleFilterChange}
        />
        <Footer />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  getCategories: requestHeader => dispatch(startGetCategories(requestHeader))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
