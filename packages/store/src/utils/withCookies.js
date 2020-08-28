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
    }
  }
`;

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

      if (isLogin && language !== locale)
        await client.mutate({
          mutation,
          variables: {
            input: { locale: language },
          },
          update: (cache, { updateShopperLanguagePreference }) => {
            if (updateShopperLanguagePreference?.status !== 'OK') return;

            // TODO: should write in the client side schema when redux removed
            cache.writeFragment({
              id: data.viewer.id,
              fragment: gql`
                fragment updateLocaleCache on User {
                  id
                  locale
                }
              `,
              data: {
                __typename: 'User',
                id: data.viewer.id,
                locale: language,
              },
            });
          },
        });
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
