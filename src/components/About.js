import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const About = ({ accessToken }) => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__title">
          About{" "}
          <Link
            to={{ pathname: "/app", search: `?access_token=${accessToken}` }}
          >
            <span className="about__brand">Melon</span>
          </Link>
        </div>
        <div className="about__desc">
          Melon is a web application that helps you find out what your musical
          taste is. If you already have a taste for music, not to worry. Melon
          will help you find even more new songs that you might also like.{" "}
          <br />
          <br />
          A personal project, Melon was created as an attempt to further my
          understanding of how React works and how to work with external APIs
          (e.g., the Spotify API). <br />
          <br />
          This is the first iteration of Melon, and I plan to make more changes
          to it in the future by adding new features and fixing bugs as they
          appear. You can check out the source code of the app{" "}
          <a href="https://github.com/leemun1/react-spotify-client">
            <strong>here.</strong>
          </a>
          <br />
          <br />
          If you liked Melon, please share it with your friends! Also, if you
          have a feedback or suggestion for me, feel free to contact me at{" "}
          <a href="mailto:mikemunkyu.lee@mail.utoronto.ca">
            <strong>mikemunkyu.lee@mail.utoronto.ca</strong>
          </a>. <br />
          <br />
          Thanks for reading! <br />
          - Mike
        </div>
        <Link to={{ pathname: "/app", search: `?access_token=${accessToken}` }}>
          <button className="about__button">Back to App</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ accessToken }) => ({
  accessToken
});

export default connect(
  mapStateToProps,
  null
)(About);
