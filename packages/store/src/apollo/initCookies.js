import gql from 'graphql-tag';

export default async (client, { req, res }) => {
  if (!req) return;

  const result = await client.query({
    query: gql`
      query getStoreLocaleAndCurrency {
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
    `,
  });

  const locales = result.data?.viewer?.store.setting.locale || ['zh_TW'];
  const locale = result.data?.viewer?.locale;
  const isLogin = result.data?.viewer?.role === 'SHOPPER';

  const language = (() => {
    if (locales.includes(locale)) return locale;

    if (locales.includes(req.language)) return req.language;

    return locales[0];
  })();

  if (req.i18n && language !== req.language)
    await req.i18n.changeLanguage(language);

  if (isLogin && language !== locale)
    await client.mutate({
      mutation: gql`
        mutation updateShopperLanguagePreference(
          $input: UpdateShopperLanguagePreferenceInput!
        ) {
          updateShopperLanguagePreference(input: $input) {
            status
          }
        }
      `,
      variables: {
        input: { locale: language },
      },
    });

  const currencys = result.data?.viewer?.store.setting.currency || ['TWD'];

  if (!req.currency || !currencys.includes(req.currency)) {
    const currency = currencys?.[0];

    req.currency = currency;
    res.cookie('currency', currency);
  }
};
