import views from 'vision';
import { index } from './handlers';

export default function register(server, options, next) {
  server.bind(options);

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: index
  });

  if (options.proxyWebpackDevServer) {
    server.route({
      method: 'GET',
      path: '/static/{resource*}',
      handler: {
        proxy: {
          mapUri(request, callback) {
            callback(null, 'http://localhost:9001' + request.url.path);
          }
        }
      }
    })
  }

  next();
}

register.attributes = {
  name: 'microbrew.views',
  version: '1.0.0'
};
