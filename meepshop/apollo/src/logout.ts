// typescript import
import { ContextType } from './index';

// definition
export const resolvers = {
  Mutation: {
    logout: async (_: unknown, __: unknown, { client }: ContextType) => {
      const res = await fetch('/api/auth/logout', {
        method: 'post',
        credentials: 'same-origin',
      });

      if (res.status !== 200)
        return {
          __typename: 'LogoutResponse',
          status: 'FAIL',
        };

      await client.resetStore();

      return {
        __typename: 'LogoutResponse',
        status: 'OK',
      };
    },
  },
};
