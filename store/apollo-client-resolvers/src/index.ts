// import
import * as user from './user';
import * as addressService from './addressService';
import * as colors from './colors';

// definition
export const initializeCache = (): void => {};

export default [user.resolver, addressService.resolver, colors.resolver].reduce(
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
