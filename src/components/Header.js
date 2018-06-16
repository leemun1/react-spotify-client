import React from "react";
import { Link } from "react-router-dom";

export default ({ accessToken }) => (
  <header className="header">
    <div className="header__items">
      <Link
        to={{
          pathname: "/app",
          search: `?access_token=${accessToken}`
        }}
        className="header__brand"
      >
        <img src="/logo.png" alt="logo" />
        <span>SoundHunt</span>
      </Link>
      <Link to="/about" className="header__about">
        <span>About</span>
      </Link>
      <Link to="/contact" className="header__contact">
        <span>Contact</span>
      </Link>
    </div>
  </header>
);
