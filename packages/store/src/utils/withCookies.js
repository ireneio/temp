// import
import { gql } from '@apollo/client';

import { withCookies } from '@meepshop/cookies';

// definition
const viewerFragment = gql`
  fragment viewerFragment on User {
    id
    locale
  }
`;

const initStoreCookies = gql`
  query initStoreCookies {
    viewer {
      id
      role
      store {
        id
        setting {
          locale
          currency
        }
      }

      ...viewerFragment
    }
  }

  ${viewerFragment}
`;

const mutation = gql`
  mutation updateShopperLanguagePreference(
    $input: UpdateShopperLanguagePreferenceInput!
  ) {
    updateShopperLanguagePreference(input: $input) {
      status
    }
  }
`;
let isLoading = false;

export const {
  appWithCookies,
  getServerSideCookiesContextProps,
  getClientSideCookiesContextProps,
} = withCookies(
  async ({ query, client, i18n, language: currentLanguage, cookie }) => {
    const { data } = await client.query({ query: initStoreCookies });
    const locales = data?.viewer?.store?.setting?.locale || ['zh_TW'];
    const locale = data?.viewer?.locale || '';
    const currencys = data?.viewer?.store?.setting?.currency || ['TWD'];
    const isLogin = data?.viewer?.role === 'SHOPPER';
    const language = (() => {
      if (locales.includes(locale)) return locale;

      if (locales.includes(currentLanguage)) return currentLanguage;

      return locales[0];
    })();

    if (query.promoCode)
      cookie.set('promoCode', query.promoCode, {
        path: '/',
        maxAge: (60 * 60 * 24 * 365 * 10).toString(),
      });

    if (language) {
      if (language !== currentLanguage) await i18n.changeLanguage(language);

      if (!isLoading && isLogin && language !== locale) {
        isLoading = true;

        await client.mutate({
          mutation,
          variables: {
            input: { locale: language },
          },
          update: (cache, { data: { updateShopperLanguagePreference } }) => {
            if (
              !data?.viewer.id ||
              updateShopperLanguagePreference.status !== 'OK'
            )
              return;

            cache.writeFragment({
              id: data.viewer.id,
              fragment: viewerFragment,
              data: {
                __typename: 'User',
                id: data.viewer.id,
                locale: language,
              },
            });
          },
        });

        isLoading = false;
      }
    }

    if (
      !cookie.get('currency') ||
      !currencys.includes(cookie.get('currency'))
    ) {
      const currency = currencys?.[0];

      if (currency)
        cookie.set('currency', currency, {
          path: '/',
          maxAge: (30 * 24 * 60 * 60 * 1000).toString(),
        });
    }

    return {
      currency: cookie.get('currency'),
      identity: cookie.get('identity'),
    };
  },
);
