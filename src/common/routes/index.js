import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { App, Home } from '../containers';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home}>
        <Redirect from="*" to="/" />
      </Route>
    </Route>
  </Router>
);
