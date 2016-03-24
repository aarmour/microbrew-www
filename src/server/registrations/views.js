import config from '../config';
import views from '../views';

const options = {
  bundleUrl: '/static/bundle.js',
  proxyWebpackDevServer: config.env === 'development'
};

export default {
  register: views,
  options
};
