import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import Empty from "./Empty";

export default ({ categories, handleFilterChange }) => (
  <section className="categories">
    <h1 className="categories__title">Step 1: Genres & Moods</h1>
    <h3 className="categories__subtitle">How are you feeling today? </h3>
    <h3 className="categories__subtitle">
      Select a card from below to check out associated playlists.
    </h3>
    <div className="categories__control">
      <span className="categories__control--name">Genres & Moods</span>
      <span className="categories__control--length">
        Showing <strong>{categories.length}</strong> categories
      </span>
      <Search handleFilterChange={handleFilterChange} />
    </div>
    <ul className="categories__grid">
      {categories.length !== 0 ? (
        categories.map(category => (
          <Link to={`/category/${category.id}`} key={category.id}>
            <li className="categories__grid__item">
              <img src={category.icons[0].url} alt="category" />
              <span>{category.name}</span>
            </li>
          </Link>
        ))
      ) : (
        <Empty />
      )}
    </ul>
  </section>
);
