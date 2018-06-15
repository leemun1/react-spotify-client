import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import categoryReducer from "../reducers/category";

const rootReducer = combineReducers({
  categories: categoryReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));
export default store;
