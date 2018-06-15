import React, { Component } from "react";
import { connect } from "react-redux";

class Category extends Component {
  findMatchedCategory = (categories, id) => {
    return categories.find(category => category.id === id);
  };

  render() {
    let categories = this.props.categories;
    let id = this.props.match.params.id;
    const category = this.findMatchedCategory(categories, id);

    return (
      <div>
        <h1>Playlists for {category.name}</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
