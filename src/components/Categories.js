import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import Empty from "./Empty";

export default ({ categories, handleFilterChange }) => (
  <section className="categories">
    <h1 className="categories__title">Step 1: Genres & Moods</h1>
    <h3 className="categories__subtitle">How are you feeling today? </h3>
    <h3 className="categories__subtitle">
      Select a card to check out related playlists.
    </h3>
    <Search handleFilterChange={handleFilterChange} />
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
