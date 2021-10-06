// typescript import
import { ContextType } from '../types';

// import
import { fetchWithRetries } from 'fbjs';

// definition
export const resolvers = {
  Mutation: {
    logout: async (_: unknown, __: unknown, { client }: ContextType) => {
      const res = await fetchWithRetries('/api/auth/logout', {
        method: 'post',
        credentials: 'same-origin',
      }).catch(() => ({ status: 500 }));

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
