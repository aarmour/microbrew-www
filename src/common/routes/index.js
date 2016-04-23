import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { App, Home, BreweryList, BreweryDetail, Beers } from '../containers';
import { BreweryListQueries, BreweryDetailQueries } from '../queries';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="breweries">
          <IndexRoute
            component={BreweryList}
            queries={BreweryListQueries}
          />
          <Route
            path=":slug"
            component={BreweryDetail}
            queries={BreweryDetailQueries}
          />
        </Route>
        <Route path="beers" component={Beers} />
        <Redirect from="*" to="/" />
      </Route>
    </Route>
  </Router>
);
