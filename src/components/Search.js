import React from "react";

export default ({ handleFilterChange }) => (
  <div className="search">
    <span>Filter: </span>
    <input type="text" onKeyUp={handleFilterChange} />
  </div>
);
