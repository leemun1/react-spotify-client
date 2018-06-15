import React from "react";

export default ({ handleFilterChange }) => (
  <section className="search">
    <p>Here is a search bar</p>
    <input type="text" onKeyUp={handleFilterChange} />
  </section>
);
