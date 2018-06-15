import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import authReducer from "../reducers/auth";
import categoryReducer from "../reducers/category";
import playlistReducer from "../reducers/playlist";

const rootReducer = combineReducers({
  accessToken: authReducer,
  categories: categoryReducer,
  playlists: playlistReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));
export default store;
