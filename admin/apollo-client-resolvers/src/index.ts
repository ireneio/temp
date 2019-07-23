// typescript import
import { InMemoryCache } from 'apollo-boost';

// import
import * as PageInfo from './PageInfo';
import * as selectedOrders from './selectedOrders';

// definition
export const initializeCache = (cache: InMemoryCache): void => {
  selectedOrders.initializeCache(cache);
};

export default [PageInfo.resolver, selectedOrders.resolver].reduce(
  (result, { Query, Mutation, ...resolver }) => ({
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
