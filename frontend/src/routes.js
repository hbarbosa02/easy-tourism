import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/forgot" component={ForgotPassword} />
    </BrowserRouter>
  );
}

export default Routes;
