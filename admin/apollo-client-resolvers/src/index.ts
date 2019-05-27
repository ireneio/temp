// typescript import
import { InMemoryCache } from 'apollo-boost';

// import
import * as PageInfo from './PageInfo';
import * as SelectedOrders from './SelectedOrders';

// definition
export const initializeCache = (cache: InMemoryCache): void => {
  SelectedOrders.initializeCache(cache);
};

export default [PageInfo.resolver, SelectedOrders.resolver].reduce(
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
