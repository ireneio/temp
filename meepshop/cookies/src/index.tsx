// typescript import
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { AppContext, AppProps } from 'next/app';
import { CookieAttributes } from 'js-cookie';

import { NextAppType, NextAppGetInitialPropsType } from '@meepshop/types';
import { I18nPropsType, languageType } from '@meepshop/utils/lib/i18n';

import { getCookiesType } from './hooks/useCookies';

// import
import React from 'react';
import { emptyFunction } from 'fbjs';
import cookie from 'js-cookie';

import { i18n } from '@meepshop/utils/lib/i18n';
import { shouldIgnoreUnauthorizedError } from '@meepshop/apollo/lib/utils/errorLink';

import useCookies from './hooks/useCookies';

// typescript definition
export interface CookiesType {
  cookies: {
    [key: string]: string | undefined;
  };
  setCookie: (key: string, value: string, options?: CookieAttributes) => void;
}

export type getCookiesArgumentType = Parameters<getCookiesType>[0];

interface CustomCtx extends AppContext {
  ctx: AppContext['ctx'] & {
    client: ApolloClient<NormalizedCacheObject>;
    req: {
      logId: string;
      i18n: I18nPropsType['i18n'];
      language: I18nPropsType['i18n']['language'];
      cookies: CookiesType['cookies'];
    };
    res: {
      cookie: (key: string, value: string, options?: CookieAttributes) => void;
    };
  };
}

interface WithCookiesPropsType extends AppProps {
  initialCookies: CookiesType['cookies'];
}

// definition
const CookiesContext = React.createContext<CookiesType>({
  cookies: {},
  setCookie: emptyFunction,
});

export const withCookies = (getCookies: getCookiesType) => (
  App: NextAppType,
): NextAppType => {
  const WithCookies = ({
    initialCookies,
    ...props
  }: WithCookiesPropsType): React.ReactElement => {
    const { cookies, setCookie } = useCookies(initialCookies, getCookies);

    return (
      <CookiesContext.Provider
        value={{
          cookies,
          setCookie,
        }}
      >
        <App {...props} />
      </CookiesContext.Provider>
    );
  };

  WithCookies.getInitialProps = async (
    ctx: CustomCtx,
  ): Promise<NextAppGetInitialPropsType<WithCookiesPropsType>> => {
    const {
      ctx: { client, res, req },
    } = ctx;
    let initialCookies = {};

    try {
      initialCookies = await getCookies(
        typeof window === 'undefined'
          ? {
              client,
              i18n: req.i18n,
              language: req.language,
              cookie: {
                get: (key: string) => req.cookies[key],
                set: (
                  key: string,
                  value: string,
                  options?: CookieAttributes,
                ) => {
                  req.cookies[key] = value;
                  res.cookie(key, value, options);
                },
              },
            }
          : {
              client,
              i18n: i18n as I18nPropsType['i18n'],
              language: i18n.language as languageType,
              cookie,
            },
      );
    } catch (e) {
      if (!shouldIgnoreUnauthorizedError(e.networkError))
        // eslint-disable-next-line no-console
        console.error(req?.logId, 'Error while running `getCookies`', e);
    }

    const appProps = await App.getInitialProps(ctx);

    return {
      ...appProps,
      initialCookies,
    };
  };

  return WithCookies;
};

export default CookiesContext;
