import React, { Component } from "react";
import queryString from "query-string";

const Header = () => (
  <header>
    <h1>This is my playlist!</h1>
  </header>
);

const Search = ({ handleFilterChange }) => (
  <section className="search">
    <p>Here is a search bar</p>
    <input type="text" onKeyUp={handleFilterChange} />
  </section>
);

const Categories = ({ categories = [], handleFilterChange }) => (
  <section className="categories">
    <Search handleFilterChange={handleFilterChange} />
    <p>Here are the categories</p>
    <ul className="categories__grid">
      {categories.map(category => (
        <li key={category.id} className="categories__grid__item">
          <img src={category.icons[0].url} alt="category" />
          {category.name}
        </li>
      ))}
    </ul>
  </section>
);

const Footer = () => (
  <footer>
    <p>This is my footer</p>
  </footer>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      categories: [],
      filter: ""
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    const requestHeader = {
      headers: { Authorization: "Bearer " + accessToken }
    };

    if (!accessToken) {
      return;
    }

    // // get user info and store in state
    // fetch("https://api.spotify.com/v1/me", requestHeader)
    //   .then(response => response.json())
    //   .then(data =>
    //     this.setState({
    //       user: {
    //         name: data.display_name
    //       }
    //     })
    //   );

    // get genres
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

    // get recommended songs based on genres
    // fetch(
    //   "https://api.spotify.com/v1/recommendations?seed_genres=acoustic,alternative,ambient",
    //   requestHeader
    // )
    //   .then(response => response.json())
    //   .then(data => console.log("songs", data));
  }

  handleFilterChange = event => {
    console.log(event.target.value);
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const categoriesToShow = this.state.categories.filter(category =>
      category.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return this.state.categories ? (
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
