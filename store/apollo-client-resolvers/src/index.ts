// typescript import
import { Resolvers } from 'apollo-client/core/types';

// import
import { emptyFunction } from 'fbjs';

import * as ColorList from './ColorList';
import * as PageInfo from './PageInfo';
import * as StoreAppList from './StoreAppList';
import * as User from './User';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';
import * as viewer from './viewer';

// definition
export const initializeCache = emptyFunction;

export const introspectionQueryResultDataType = [];

export default [
  ColorList.resolver,
  PageInfo.resolver,
  StoreAppList.resolver,
  User.resolver,
  validatedConvenienceStoreCities.resolver,
  viewer.resolver,
].reduce(
  (result, { Query, Mutation, ...resolver }: Resolvers) => ({
    ...result,
    ...resolver,
    Query: {
      ...result.Query,
      ...Query,
    },
    Mutation: {
      ...result.Mutation,
      ...Mutation,
    },
  }),
  {
    Query: {},
    Mutation: {},
  },
);
