import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./styles/css/index.css";
import Router from "./components/Router";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
