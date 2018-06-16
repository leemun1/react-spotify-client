import React from "react";
import { Link } from "react-router-dom";

export default ({ accessToken }) => (
  <header className="header">
    <Link
      to={{
        pathname: "/app",
        search: `?access_token=${accessToken}`
      }}
      className="header__brand"
    >
      <span>SoundHunt</span>
    </Link>
    <Link to="/about" className="header__about">
      <span>About</span>
    </Link>
    <Link to="/contact" className="header__contact">
      <span>Contact</span>
    </Link>
  </header>
);
