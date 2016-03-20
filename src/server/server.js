import path from 'path';
import config from './config';
import { Server } from 'hapi';
import api from './registrations/api';
import monitoring from './registrations/monitoring';

const server = new Server();

server.connection({
  host: config.host,
  port: config.port
});

server.register([
  monitoring,
  api
], error => {
  if (error) throw error;

  server.start(() => server.log(`Server running at: ${server.info.uri}`));
});
