// FIXME: T10566, rewrite after next >= 12
// typescript import
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { CookieAttributes } from 'js-cookie';

import { NextAppType } from '@meepshop/types';
import { I18nPropsType, languageType } from '@meepshop/locales';

import { getCookiesType } from './hooks/useCookies';

// import
import React from 'react';
import { emptyFunction } from 'fbjs';
import cookie from 'js-cookie';
import { serialize } from 'cookie';

import { i18n } from '@meepshop/locales';

import useCookies from './hooks/useCookies';

// typescript definition
interface CookieAttributesType extends Omit<CookieAttributes, 'expires'> {
  expires?: Date;
}

export interface CookiesType {
  cookies: {
    [key: string]: string | undefined;
  };
  setCookie: (
    key: string,
    value: string,
    options?: CookieAttributesType,
  ) => void;
}

export type getCookiesArgumentType = Parameters<getCookiesType>[0];

export interface CustomCtx extends NextPageContext {
  client: ApolloClient<NormalizedCacheObject>;
  req: NextPageContext['req'] & {
    i18n: I18nPropsType['i18n'];
    language: I18nPropsType['i18n']['language'];
    cookies: CookiesType['cookies'];
  };
  res: NextPageContext['res'] & {
    cookie: CookiesType['setCookie'];
  };
}

interface PropsType {
  initialCookies: CookiesType['cookies'];
}

interface ReturnType {
  appWithCookies: (App: NextAppType) => NextAppType;
  getServerSideCookiesContextProps: (ctx: CustomCtx) => Promise<PropsType>;
  getClientSideCookiesContextProps: (ctx: CustomCtx) => Promise<PropsType>;
}

// definition
const CookiesContext = React.createContext<CookiesType>({
  cookies: {},
  setCookie: emptyFunction,
});

export const withCookies = (getCookies: getCookiesType): ReturnType => ({
  appWithCookies: App => {
    const Component = ({
      initialCookies,
      ...props
    }: PropsType & AppProps): React.ReactElement => {
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

    Component.getInitialProps = App.getInitialProps;

    return Component;
  },
  getServerSideCookiesContextProps: async ctx => {
    const { client, res, req, pathname } = ctx;

    return {
      initialCookies: await getCookies({
        pathname,
        client,
        i18n: req.i18n,
        language: req.language,
        cookie: {
          get: (key: string) => req.cookies[key],
          set: (key: string, value: string, options?: CookieAttributesType) => {
            req.cookies[key] = value;
            res.setHeader('Set-Cookie', serialize(key, value, options));
          },
        },
      }),
    };
  },
  getClientSideCookiesContextProps: async ctx => {
    const { client, pathname } = ctx;

    return {
      initialCookies: await getCookies({
        pathname,
        client,
        i18n: i18n as I18nPropsType['i18n'],
        language: i18n.language as languageType,
        cookie,
      }),
    };
  },
});

export default CookiesContext;
