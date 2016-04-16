import { hapi as GraphQL } from '@risingstack/graffiti';
import { Schema } from './schema';

export default function register(server, options, next) {
  server.register({
    register: GraphQL,
    options: {
      schema: Schema
    }
  });

  next();
}

register.attributes = {
  name: 'microbrew.api',
  version: '1.0.0'
};
