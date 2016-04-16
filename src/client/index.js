import React from 'react';
import { render } from 'react-dom';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { browserHistory } from 'react-router';
import routes from '../common/routes';

const mountElement = document.getElementById('react-mount');

IsomorphicRelay.injectPreparedData(window.__RELAY_DATA__);

render(
  // routes,
  <IsomorphicRouter.Router routes={routes} history={browserHistory} />,
  mountElement
);
