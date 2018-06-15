import React from "react";
import { Link } from "react-router-dom";

export default ({ accessToken }) => (
  <header className="header">
    <Link
      to={{
        pathname: "/app",
        search: `?access_token=${accessToken}`
      }}
    >
      <h1 className="header__title">Spotify Clone</h1>
      <h3 className="header__subtitle">Find out about your musical taste </h3>
    </Link>
  </header>
);
