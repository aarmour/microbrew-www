import { hapi as GraphQL } from '@risingstack/graffiti';
import { ApiSchema } from './schema';

export default function register(server, options, next) {
  server.register({
    register: GraphQL,
    options: {
      schema: ApiSchema
    }
  });

  next();
}

register.attributes = {
  name: 'microbrew.api',
  version: '1.0.0'
};
