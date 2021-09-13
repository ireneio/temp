// typescript import
import { Resolvers } from 'apollo-client/core/types';

import { loggerType } from '@meepshop/logger';

// graphql typescript
import { LogInput } from '@meepshop/types/gqls/meepshop';

// definition
export const resolvers = (logger: loggerType): Resolvers => ({
  Mutation: {
    log: async (
      _: unknown,
      { input: { type, name, data } }: { input: LogInput },
    ) => {
      try {
        await logger[type.toLowerCase() as keyof loggerType]({
          ...data,
          name,
        });

        return 'OK';
      } catch (e) {
        return 'Fail';
      }
    },
  },
});
