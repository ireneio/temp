// import
import * as colors from './colors';

// definition
export const initializeCache = (): void => {};

export default [colors.resolver].reduce(
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
