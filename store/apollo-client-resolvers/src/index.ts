// typescript import
import { Resolvers } from 'apollo-client/core/types';

// import
import * as ColorList from './ColorList';
import * as PageInfo from './PageInfo';
import * as RecipientObjectType from './RecipientObjectType';
import * as StoreAppList from './StoreAppList';
import * as SettingObjectType from './SettingObjectType';
import * as User from './User';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';
import * as viewer from './viewer';

// definition
export const initializeCache = (): void => {};

export const introspectionQueryResultDataType = [];

export default [
  ColorList.resolver,
  PageInfo.resolver,
  RecipientObjectType.resolver,
  StoreAppList.resolver,
  SettingObjectType.resolver,
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
