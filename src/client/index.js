import './vendor';
import React from 'react';
import { render } from 'react-dom';
import routes from '../common/routes';

const mountElement = document.getElementById('react-mount');

render(
  routes,
  mountElement
);
