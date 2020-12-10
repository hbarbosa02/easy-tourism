import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Travel from "./pages/Travel";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/travels" exact component={Travel} />
    </BrowserRouter>
  );
}

export default Routes;
