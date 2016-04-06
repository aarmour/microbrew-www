import fs from 'fs';
import path from 'path';
import CleanCss from 'clean-css';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../common/routes';
import template from './templates/index';

function loadCssReset() {
  const normalizeCssPath = require.resolve('normalize.css/normalize.css');

  return fs.readFileSync(normalizeCssPath, 'utf8');
}

function loadCss() {
  return loadCssReset() +
    fs.readFileSync(path.resolve(__dirname, './css/box-sizing.css'));
}

const minifier = new CleanCss();

function minifyCss(css) {
  return minifier.minify(css).styles;
}

export function index(request, reply) {

  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) return reply(error);
    if (redirectLocation) return reply.redirect(redirectLocation.pathname + redirectLocation.search);

    const appHtml = renderToString(<RouterContext {...renderProps} />);

    const data = {
      html: appHtml,
      css: minifyCss(loadCss()),
      bundleUrl: this.bundleUrl };

    const html = template(data);

    reply(html);
  });
}
