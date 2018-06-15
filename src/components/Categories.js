import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";

export default ({ categories = [], handleFilterChange }) => (
  <section className="categories">
    <Search handleFilterChange={handleFilterChange} />
    <p>Here are the categories</p>
    <ul className="categories__grid">
      {categories.map(category => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <li className="categories__grid__item">
            <img src={category.icons[0].url} alt="category" />
            {category.name}
          </li>
        </Link>
      ))}
    </ul>
  </section>
);
