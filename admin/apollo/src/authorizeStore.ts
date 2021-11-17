// graphql typescript
import { AuthorizeStoreInput } from '@meepshop/types/gqls/admin';

// definition
export const resolvers = {
  Mutation: {
    authorizeStore: async (
      _: unknown,
      { input: { token } }: { input: AuthorizeStoreInput },
    ) => {
      const res = await fetch('/api/authorize-store', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-meepshop-authorization-token': token,
        },
        credentials: 'include',
      });

      if (res.status !== 200)
        return {
          __typename: 'AuthorizeStoreEnum',
          status: 'AUTHORIZE_STORE_FAIL',
        };

      return {
        __typename: 'AuthorizeStoreEnum',
        status: 'OK',
      };
    },
  },
};
