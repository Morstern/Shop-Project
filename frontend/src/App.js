import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation } from "./components/layout/common/Navigation";
import { Home } from "./components/layout/home/Home";

import { Clients } from "./components/layout/clients/Clients";
import { ClientInfo } from "./components/layout/clients/ClientInfo";
import { ClientOrders } from "./components/layout/clients/ClientOrders";

import { Orders } from "./components/layout/orders/Orders";
import { OrderInfo } from "./components/layout/orders/OrderInfo";

import { Manage } from "./components/layout/manage/Manage";
import { NotFound } from "./components/layout/errors/NotFound";

export const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/client/:id" component={ClientInfo} />
          <Route exact path="/client/:id/orders" component={ClientOrders} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/order/:id" component={OrderInfo} />
          <Route exact path="/manage" component={Manage} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
