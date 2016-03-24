import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../common/routes';
import template from './templates/index';

export function index(request, reply) {

  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) return reply(error);
    if (redirectLocation) return reply.redirect(redirectLocation.pathname + redirectLocation.search);

    const appHtml = renderToString(<RouterContext {...renderProps} />);
    const data = { html: appHtml, bundleUrl: this.bundleUrl };
    const html = template(data);

    reply(html);
  });
}
