import { withClientState } from 'apollo-link-state';

export default cache =>
  withClientState(
    [].reduce(
      (result, { defaults = {}, resolvers = {}, typeDefs = [] }) => ({
        defaults: {
          ...result.defaults,
          ...defaults,
        },
        resolvers: {
          ...result.resolvers,
          ...resolvers,
        },
        typeDefs: [...result.typeDefs, ...typeDefs],
      }),
      {
        defaults: {},
        resolvers: {},
        typeDefs: [],
        cache,
      },
    ),
  );
