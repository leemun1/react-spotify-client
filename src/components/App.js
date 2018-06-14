import React, { Component } from "react";

const Header = () => (
  <header>
    <h1>This is my playlist!</h1>
  </header>
);

const PlaylistsSummary = () => (
  <section>
    <h1>Here is a summary of the playlists</h1>
  </section>
);

const PlaylistsGroup = () => (
  <div>
    <h1>Here are the playlists</h1>
  </div>
);

const Footer = () => (
  <footer>
    <h1>This is my footer</h1>
    <div>Created by Mike Lee</div>
  </footer>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PlaylistsSummary />
        <PlaylistsGroup />
        <Footer />
      </div>
    );
  }
}

export default App;
