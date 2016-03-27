import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  browserHistory
} from 'react-router';
import {
  App,
  Home,
  Breweries,
  Beers
} from '../containers';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="breweries" component={Breweries} />
      <Route path="beers" component={Beers} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
);