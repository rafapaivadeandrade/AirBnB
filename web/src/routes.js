import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New/index";
import EditSpot from "./pages/EditSpot";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={New} path="/new" />
        <Route component={EditSpot} path="/editSpot" />
      </Switch>
    </BrowserRouter>
  );
}
