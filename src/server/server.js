import path from 'path';
import config from './config';
import { Server } from 'hapi';
import staticAssets from 'inert';
import proxy from 'h2o2';
import views from './registrations/views';
import api from './registrations/api';
import monitoring from './registrations/monitoring';

const server = new Server();

server.connection({
  host: config.host,
  port: config.port
});

server.register([
  proxy,
  monitoring,
  api,
  staticAssets,
  views
], error => {
  if (error) throw error;

  server.start(() => server.log(`Server running at: ${server.info.uri}`));
});
