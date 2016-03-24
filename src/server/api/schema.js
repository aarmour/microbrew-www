import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLInteger
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
 * type Beer {
 *   id: String!
 *   brewery_id: String!
 *   name: String
 *   description: String
 *   malts: [String]
 *   hops: [String]
 *   ibus: Integer
 *   abv_pct: Float
 * }
 */
export const beerType = new GraphQLObjectType({
  name: 'Beer',
  description: 'A beer.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The beer\'s unique identifier.'
    },
    brewery_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The brewery\'s unique identifier.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the beer.'
    },
    description: {
      type: GraphQLString,
      description: 'The description of the beer.'
    },
    malts: {

    },
    hops: {

    },
    ibus: {
      type: GraphQLInteger,
      description: 'International Bittering Units measurement of the bitterness of the beer.'
    },
    abv_pct: {
      type: GraphQLFloat,
      description: 'Alcohol By Volume, expressed as a percentage.'
    }
  })
});

/**
 * type Query {
 *   brewery(id: String!): Brewery
 *   beer(id: String!): Beer
 *   beers(brewery_id: String!): [Beer]
 *   findBeers(query: String!): [Beer]
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
