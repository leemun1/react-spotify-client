import React from "react";
import ReactDOM from "react-dom";

import "./styles/css/index.css";
import Router from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Router />, document.getElementById("root"));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
