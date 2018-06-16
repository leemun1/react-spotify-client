import React from "react";

import Icon from "./Icon";

export default ({ handleFilterChange }) => (
  <div className="search">
    <input type="text" onKeyUp={handleFilterChange} placeholder="Filter" />
    <Icon name="search" />
  </div>
);
