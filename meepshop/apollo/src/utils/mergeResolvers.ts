// typescript import
import { Resolvers } from 'apollo-client/core/types';

// definition
export default (prevResolvers: Resolvers, newResolvers: Resolvers): Resolvers =>
  Object.keys(newResolvers).reduce(
    (result: Resolvers, key: string) => ({
      ...result,
      [key]: Object.keys(newResolvers[key]).reduce(
        (fieldResult: Resolvers[string], field: string) => ({
          ...fieldResult,
          [field]: !fieldResult?.[field]
            ? newResolvers[key][field]
            : (...argu) => ({
                // FIXME: should newResolvers overwrite fieldResult
                ...newResolvers[key][field](...argu),
                ...fieldResult[field](...argu),
              }),
        }),
        result[key],
      ),
    }),
    prevResolvers,
  );
