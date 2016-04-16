import url from 'url';
import config from '../config';
import views from '../views';

const graphQLUrl = url.format({
  protocol: 'http',
  hostname: config.host,
  port: config.port,
  pathname: 'graphql'
});

const options = {
  graphQLUrl,
  bundleUrl: '/static/bundle.js',
  proxyWebpackDevServer: config.env === 'development'
};

export default {
  register: views,
  options
};
