// import
import * as user from './user';
import * as recipients from './recipients';
import * as addressService from './addressService';
import * as colors from './colors';

// definition
export const initializeCache = (): void => {};

export default [
  user.resolver,
  recipients.resolver,
  addressService.resolver,
  colors.resolver,
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
