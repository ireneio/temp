// typescript import
import { InMemoryCache } from 'apollo-cache-inmemory';

import { CustomCtx } from './index';
import { ContextType } from './constants';

// import
import gql from 'graphql-tag';
import cookie from 'js-cookie';

// graphql typescript
import { SetCookiesInput } from '../../../__generated__/admin';

import {
  setCookiesCache,
  setCookiesCache_cookies as setCookiesCacheCookies,
} from './__generated__/setCookiesCache';

// definition
const query = gql`
  query setCookiesCache {
    cookies @client {
      id
      menuCollapsed
    }
  }
`;

const getCookies = <C extends CustomCtx>(ctx?: C): setCookiesCacheCookies => ({
  __typename: 'Cookies',
  id: 'cookies',
  menuCollapsed:
    (ctx ? ctx.req.cookies.menuCollapsed : cookie.get('menuCollapsed')) ===
    'true',
});

export const initializeCache = <C extends CustomCtx>(
  cache: InMemoryCache,
  ctx: C | undefined,
): void => {
  cache.writeQuery<setCookiesCache>({
    query,
    data: {
      cookies: getCookies(ctx),
    },
  });
};

export const resolvers = {
  Mutation: {
    refetchCookies: (_: unknown, __: unknown, { cache }: ContextType) => {
      cache.writeQuery<setCookiesCache>({
        query,
        data: {
          cookies: getCookies(),
        },
      });

      return true;
    },
    setCookies: (
      _: unknown,
      { input }: { input: SetCookiesInput },
      { cache }: ContextType,
    ) => {
      const cookies = getCookies();

      Object.keys(input).forEach(
        (key: Exclude<keyof setCookiesCacheCookies, '__typename' | 'id'>) => {
          const value = input[key];

          if (value === null || value === undefined) return;

          cookies[key] = value;
          cookie.set(key, value.toString());
        },
      );

      cache.writeQuery<setCookiesCache>({
        query,
        data: {
          cookies,
        },
      });
    },
  },
};
