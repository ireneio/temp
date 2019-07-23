// import
import * as AddressService from './AddressService';
import * as ColorList from './ColorList';
import * as PageInfo from './PageInfo';
import * as RecipientObjectType from './RecipientObjectType';
import * as User from './User';

// definition
export const initializeCache = (): void => {};

export default [
  AddressService.resolver,
  ColorList.resolver,
  PageInfo.resolver,
  RecipientObjectType.resolver,
  User.resolver,
].reduce(
  (result, { Query, ...resolver }) => ({
    ...result,
    ...resolver,
    Query: {
      ...result.Query,
      ...Query,
    },
  }),
  {
    Query: {},
  },
);
