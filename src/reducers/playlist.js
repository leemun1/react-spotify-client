import { GET_PLAYLISTS } from "../constants";

const playlistReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      return [...action.playlists];
    default:
      return state;
  }
};

export default playlistReducer;
