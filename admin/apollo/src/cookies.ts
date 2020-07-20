// typescript import
import { CustomCtxType, ContextType } from '@meepshop/apollo';

// import
import gql from 'graphql-tag';
import cookie from 'js-cookie';

// graphql typescript
import { SetCookiesInput } from '../../../__generated__/admin';

import {
  setCookiesCache,
  setCookiesCache_cookies as setCookiesCacheCookies,
} from './__generated__/setCookiesCache';

// typescript definition
interface ReqType {
  cookies: {
    [key: string]: string;
  };
}

// definition
const query = gql`
  query setCookiesCache {
    cookies @client {
      id
      menuCollapsed
    }
  }
`;

const getCookies = <C extends CustomCtxType<ReqType>>(
  ctx?: C,
): setCookiesCacheCookies => ({
  __typename: 'Cookies',
  id: 'cookies',
  menuCollapsed:
    (ctx ? ctx?.ctx.req.cookies.menuCollapsed : cookie.get('menuCollapsed')) ===
    'true',
});

export const initializeCache = <C extends CustomCtxType>(
  cache: ContextType['cache'],
  ctx?: C,
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
