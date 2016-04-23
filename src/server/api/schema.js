import {
  GraphQLSchema,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInteger,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Brewery,
  getBreweries,
  getBrewery
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch(type) {
      case 'Brewery':
        return getBrewery(id);
      case 'Beer':
        return getBeer(id);
      default:
        return null;
    }
  },
  (obj) => {
    if (obj instanceof Brewery) {
      return breweryType;
    } else {
      return null;
    }
  }
);

export const addressType = new GraphQLObjectType({
  name: 'Address',
  description: 'A postal address.',
  fields: () => ({
    street: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    postal_code: {
      type: GraphQLString
    },
    formatted: {
      type: GraphQLString,
      description: 'The address formatted for display.',
      resolve(address) {
        const {
          street,
          city,
          state,
          postal_code
        } = address;

        return `${street}, ${city}, ${state} ${postal_code}`;
      }
    }
  })
});

export const coordinatePairType = new GraphQLObjectType({
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

export const breweryType = new GraphQLObjectType({
  name: 'Brewery',
  description: 'A brewery.',
  fields: () => ({
    id: globalIdField('Brewery'),
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A URL-friendly identifier.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the brewery.'
    },
    address: {
      type: addressType,
      description: 'The address of the brewery.',
      resolve: (brewery) => brewery.address
    },
    coordinates: {
      type: coordinatePairType,
      description: 'The geographic location of the brewery.',
      resolve: (brewery) => brewery.coordinates
    }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: breweryConnectionType } =
  connectionDefinitions({ name: 'Breweries', nodeType: breweryType });

// export const beerType = new GraphQLObjectType({
//   name: 'Beer',
//   description: 'A beer.',
//   fields: () => ({
//     id: globalIdField('Beer'),
//     brewery_id: {
//       type: new GraphQLNonNull(GraphQLString),
//       description: 'The brewery\'s unique identifier.'
//     },
//     name: {
//       type: GraphQLString,
//       description: 'The name of the beer.'
//     },
//     description: {
//       type: GraphQLString,
//       description: 'The description of the beer.'
//     },
//     malts: {
//
//     },
//     hops: {
//
//     },
//     ibus: {
//       type: GraphQLInteger,
//       description: 'International Bittering Units measurement of the bitterness of the beer.'
//     },
//     abv_pct: {
//       type: GraphQLFloat,
//       description: 'Alcohol By Volume, expressed as a percentage.'
//     }
//   }),
//   interfaces: [nodeInterface]
// });

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    breweries: {
      type: breweryConnectionType,
      args: connectionArgs,
      resolve: (a, args) => connectionFromArray(getBreweries(), args)
    },
    brewery: {
      type: breweryType,
      args: {
        slug: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { slug }) => getBrewery(slug)
    }
  })
});

export const Schema = new GraphQLSchema({
  query: queryType
});
