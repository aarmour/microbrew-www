import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat
} from 'graphql';
import { getBrewery } from './resolvers';

/**
 * interface Address {
 *   display: String
 * }
 */
export const addressInterface = new GraphQLInterfaceType({
  name: 'Address',
  description: 'A postal address',
  fields: () => ({
    display: {
      type: GraphQLString,
      description: 'The address formatted for display.'
    }
  })
});

/**
 * interface CoordinatePair {
 *   x: Float
 *   y: Float
 * }
 */
export const coordinatePairInterface = new GraphQLInterfaceType({
  name: 'CoordinatePair',
  description: 'A geographic coordinate pair.',
  fields: () => ({
    x: {
      type: GraphQLFloat,
      description: 'The x-axis coordinate (longitude for GCS).'
    },
    y: {
      type: GraphQLFloat,
      description: 'The y-axis coordinate (latitude for GCS).'
    }
  })
});

/**
 * type Brewery {
 *   id: String!
 *   slug: String!
 *   name: String
 *   address: Address
 *   coordinates: CoordinatePair
 * }
 */
export const breweryType = new GraphQLObjectType({
  name: 'Brewery',
  description: 'A brewery.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The brewery\'s unique identifier.'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A URL-friendly identifier.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the brewery.'
    },
    address: {
      type: addressInterface,
      description: 'The address of the brewery.'
    },
    coordinates: {
      type: coordinatePairInterface,
      description: 'The geographic location of the brewery.'
    }
  })
});

/**
 * type Query {
 *   brewery(id: String!): Brewery
 * }
 */
export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    brewery: {
      type: breweryType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The brewery\'s unique identifier.'
        }
      },
      resolve: (root, { id }) => getBrewery(id)
    }
  })
});

export const ApiSchema = new GraphQLSchema({
  query: queryType
});
