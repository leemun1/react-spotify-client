import React, { Component } from "react";

export default class Category extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Playlists for Category</h1>
      </div>
    );
  }
}
