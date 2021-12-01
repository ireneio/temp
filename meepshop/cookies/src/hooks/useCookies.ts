// typescript import
import { ApolloClient } from 'apollo-client';

import { I18nPropsType, languageType } from '@meepshop/locales';

import { CookiesType } from '../index';

// import
import { useState, useEffect, useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { areEqual } from 'fbjs';
import cookie from 'js-cookie';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { usePrevious } from '@meepshop/hooks';

// typescript definition
export type getCookiesType = (ctx: {
  pathname: string;
  client: ApolloClient<object>;
  i18n: I18nPropsType['i18n'];
  language: languageType;
  cookie: {
    get: (key: string) => string | undefined;
    set: (key: string, value: string) => void;
  };
}) => Promise<CookiesType['cookies']>;

// definition
export default (
  initialCookies: CookiesType['cookies'],
  getCookies: getCookiesType,
): {
  cookies: CookiesType['cookies'];
  setCookie: (key: string, value: string) => void;
} => {
  const router = useRouter();
  const client = useApolloClient();
  const { i18n } = useTranslation();
  const [cookies, setCookies] = useState(initialCookies);
  const prevInitialCookies = usePrevious<CookiesType['cookies']>(
    initialCookies,
  );

  useEffect(() => {
    const offResetStore = client.onResetStore(async () => {
      setCookies({});
      setCookies(
        await getCookies({
          pathname: router.pathname,
          client,
          i18n: i18n as I18nPropsType['i18n'],
          language: i18n.language as languageType,
          cookie,
        }),
      );
    });

    return () => {
      offResetStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    if (!areEqual(prevInitialCookies, initialCookies))
      setCookies(initialCookies);
  }, [initialCookies, prevInitialCookies]);

  return {
    cookies,
    setCookie: useCallback((key: string, value: string) => {
      if (typeof window === 'undefined') return;

      cookie.set(key, value);
    }, []),
  };
};
