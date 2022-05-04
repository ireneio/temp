// typescript import
import { ContextType } from '../constants';

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

      if (typeof window !== 'undefined') window.sessionStorage.clear();

      return {
        __typename: 'LogoutResponse',
        status: 'OK',
      };
    },
  },
};
