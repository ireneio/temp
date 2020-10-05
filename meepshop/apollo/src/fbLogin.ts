// typescript import
import { ContextType } from './index';

// definition
export const resolvers = {
  Mutation: {
    fbLogin: async (
      _: unknown,
      // TODO: should use graphql type
      { input: { accessToken } }: { input: { accessToken: string } },
      { client }: ContextType,
    ) => {
      const res = await fetch('/api/auth/fbLogin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ accessToken }),
      });
      const defaultResponse = {
        __typename: 'FbLoginResponse',
        status: 'FAIL',
        message: null,
      };

      if (res.status !== 200)
        return {
          ...defaultResponse,
          message: `${res.status} ${res.statusText}`,
        };

      const { code } = await res.json();

      switch (code) {
        case 200:
          await client.resetStore();

          return { ...defaultResponse, status: 'OK' };

        case 201:
          await client.resetStore();

          return { ...defaultResponse, status: 'FIRST_LOGIN' };

        case 2010:
          return { ...defaultResponse, status: 'EXPIRED_ACCESS_TOKEN' };

        case 2011:
          return { ...defaultResponse, status: 'CANNOT_GET_EMAIL' };

        case 2003:
          return { ...defaultResponse, status: 'INVALID_TOKEN' };

        default:
          return { ...defaultResponse, status: 'UNKNOWN_ERROR' };
      }
    },
  },
};
