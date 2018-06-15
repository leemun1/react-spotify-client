import React, { Component } from "react";
import queryString from "query-string";

import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: "",
      user: {},
      categories: [],
      filter: ""
    };
  }

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

    // get categories from spotify API
    fetch(
      "https://api.spotify.com/v1/browse/categories?limit=50",
      requestHeader
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          categories: data.categories.items.slice(1)
        });
      });
  }

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

export default App;
