import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAccount from '../pages/create-account';
import { Login } from '../pages/login';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
  );
};
