import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { App, Home, Breweries, Beers } from '../containers';
import { BreweryQueries } from '../queries';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="breweries" component={Breweries} queries={BreweryQueries} />
        <Route path="beers" component={Beers} />
        <Redirect from="*" to="/" />
      </Route>
    </Route>
  </Router>
);
