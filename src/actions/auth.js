import queryString from "query-string";

import { GET_ACCESS_TOKEN } from "../constants";

// Fetch Categories
export const getAccessToken = accessToken => ({
  type: GET_ACCESS_TOKEN,
  accessToken
});

export const startGetAccessToken = () => {
  return dispatch => {
    // get access token
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    return dispatch(getAccessToken(accessToken));
  };
};
