import React from "react";
import { Link } from "react-router-dom";

export default ({ accessToken }) => (
  <header>
    <Link
      to={{
        pathname: "/app",
        search: `?access_token=${accessToken}`
      }}
    >
      <h1>Spotify Clone</h1>
    </Link>
  </header>
);
