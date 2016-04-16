import fs from 'fs';
import path from 'path';
import CleanCss from 'clean-css';
import React from 'react';
import Relay from 'react-relay';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import IsomorphicRouter from 'isomorphic-relay-router';
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

const css = minifyCss(loadCss());

export function index(request, reply) {

  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) return reply(error);
    if (redirectLocation) return reply.redirect(redirectLocation.pathname + redirectLocation.search);

    const { bundleUrl } = this;

    IsomorphicRouter.prepareData(renderProps)
      .then(render)
      // .catch(reply);
      .catch(error => {
        console.log('ERROR:', error);
        reply(error);
      });

    function render({ data, props }) {
      const appHtml = renderToString(
        <IsomorphicRouter.RouterContext {...props} />
      );

      const templateData = {
        html: appHtml,
        css,
        relay: data,
        bundleUrl
      };

      const html = template(templateData);

      reply(html);
    }

  });
}
