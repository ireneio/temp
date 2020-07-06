// typescript import
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client/core/types';
import { AppContext } from 'next/app';

// import
import { modulesDataType } from '@meepshop/modules';

import * as cookies from './cookies';
import * as PageInfo from './PageInfo';
import * as selectedOrders from './selectedOrders';
import * as viewer from './viewer';

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
  ctx?: C,
): void => {
  cookies.initializeCache(cache, ctx);
  selectedOrders.initializeCache(cache);
};

export const introspectionQueryResultDataType = [modulesDataType];

export default [
  PageInfo.resolvers,
  selectedOrders.resolvers,
  viewer.resolvers,
  cookies.resolvers,
].reduce(
  (result, { Query, Mutation, ...resolvers }: Resolvers) => ({
    ...result,
    ...resolvers,
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
