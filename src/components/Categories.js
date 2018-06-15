import React from "react";
import Search from "./Search";

export default ({ categories = [], handleFilterChange }) => (
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
