// typescript import
import { Resolvers } from 'apollo-client/core/types';

// definition
export default (prevResolvers: Resolvers, newResolvers: Resolvers): Resolvers =>
  Object.keys(newResolvers).reduce(
    (result: Resolvers, key: string) => ({
      ...result,
      [key]: {
        ...result[key],
        ...newResolvers[key],
      },
    }),
    prevResolvers,
  );
