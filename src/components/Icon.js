import React from "react";

const Icon = ({ name }) => (
  <svg>
    <use xlinkHref={`sprite.svg#icon-${name}`} />
  </svg>
);

export default Icon;
