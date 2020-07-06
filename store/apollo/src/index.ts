// typescript import
import { Resolvers } from 'apollo-client/core/types';

// import
import { emptyFunction } from 'fbjs';

import { modulesDataType } from '@meepshop/modules';

import * as ColorList from './ColorList';
import * as PageInfo from './PageInfo';
import * as StoreAppList from './StoreAppList';
import * as User from './User';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';
import * as viewer from './viewer';

// definition
export const initializeCache = emptyFunction;

export const introspectionQueryResultDataType = [modulesDataType];

export default [
  ColorList.resolvers,
  PageInfo.resolvers,
  StoreAppList.resolvers,
  User.resolvers,
  validatedConvenienceStoreCities.resolvers,
  viewer.resolvers,
].reduce(
  (result, { Query, Mutation, ...resolvers }: Resolvers) => ({
    ...result,
    ...resolvers,
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
