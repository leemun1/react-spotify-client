import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import Category from "./Category";
import Playlist from "./Playlist";
import About from "./About";
import Contact from "./Contact";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/app" component={App} />
      <Route exact path="/category/:id" component={Category} />
      <Route path="/category/:id/:id" component={Playlist} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
