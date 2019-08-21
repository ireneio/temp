// typescript import
import { InMemoryCache } from 'apollo-boost';
import { Resolvers } from 'apollo-client/core/types';

// import
import * as PageInfo from './PageInfo';
import * as selectedOrders from './selectedOrders';

// definition
export const initializeCache = (cache: InMemoryCache): void => {
  selectedOrders.initializeCache(cache);
};

export const introspectionQueryResultDataType = [];

export default [PageInfo.resolver, selectedOrders.resolver].reduce(
  (result, { Query, Mutation, ...resolver }: Resolvers) => ({
    ...result,
    ...resolver,
    Mutation: {
      ...result.Mutation,
      ...Mutation,
    },
    Query: {
      ...result.Query,
      ...Query,
    },
  }),
  {
    Query: {},
    Mutation: {},
  },
);
