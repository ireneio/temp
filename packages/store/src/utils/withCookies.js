// import
import gql from 'graphql-tag';

import { withCookies } from '@meepshop/cookies';

// definition
const query = gql`
  query initStoreCookies {
    viewer {
      id
      role
      locale
      store {
        id
        setting {
          locale
          currency
        }
      }
    }
  }
`;

const mutation = gql`
  mutation updateShopperLanguagePreference(
    $input: UpdateShopperLanguagePreferenceInput!
  ) {
    updateShopperLanguagePreference(input: $input) {
      status
      updateCache(input: $input) @client
    }
  }
`;
let isLoading = false;

export default withCookies(
  async ({ client, i18n, language: currentLanguage, cookie }) => {
    const { data } = await client.query({ query });
    const locales = data?.viewer?.store?.setting?.locale || ['zh_TW'];
    const locale = data?.viewer?.locale || '';
    const currencys = data?.viewer?.store?.setting?.currency || ['TWD'];
    const isLogin = data?.viewer?.role === 'SHOPPER';
    const language = (() => {
      if (locales.includes(locale)) return locale;

      if (locales.includes(currentLanguage)) return currentLanguage;

      return locales[0];
    })();

    if (language) {
      if (language !== currentLanguage) await i18n.changeLanguage(language);

      if (!isLoading && isLogin && language !== locale) {
        isLoading = true;
        await client.mutate({
          mutation,
          variables: {
            input: { locale: language },
          },
          onCompleted: () => {
            isLoading = false;
          },
        });
      }
    }

    if (
      !cookie.get('currency') ||
      !currencys.includes(cookie.get('currency'))
    ) {
      const currency = currencys?.[0];

      if (currency) cookie.set('currency', currency);
    }

    return {
      currency: cookie.get('currency'),
    };
  },
);
