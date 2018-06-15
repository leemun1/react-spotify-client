import { GET_PLAYLISTS } from "../constants";

// Fetch Playlists
export const getPlaylists = playlists => ({ type: GET_PLAYLISTS, playlists });

export const startGetPlaylists = (requestHeader, id) => {
  return dispatch => {
    // get category's playlists from spotify API
    return fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`,
      requestHeader
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const playlists = data.playlists.items;
        dispatch(getPlaylists(playlists));
      });
  };
};
