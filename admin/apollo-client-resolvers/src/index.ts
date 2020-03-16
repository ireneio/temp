// typescript import
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client/core/types';
import { AppContext } from 'next/app';

// import
import * as PageInfo from './PageInfo';
import * as selectedOrders from './selectedOrders';

// typescript definition
type CtxType = AppContext['ctx'];
export interface CustomCtx extends CtxType {
  req: CtxType['req'] & {
    cookies: {
      [key: string]: string;
    };
  };
}

// definition
export const initializeCache = <C extends CustomCtx>(
  cache: InMemoryCache,
  _: C | undefined,
): void => {
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
