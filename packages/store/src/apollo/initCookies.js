import gql from 'graphql-tag';

export default async (client, { req, res }) => {
  if (!req) return;

  const result = await client.query({
    query: gql`
      query getStoreLocaleAndCurrency {
        viewer {
          id
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
  const locale = result.data?.viewer?.store.setting.locale || ['zh_TW'];

  if (!locale.includes(req.language))
    if (req.i18n) await req.i18n.changeLanguage(locale[0]);

  const currencys = result.data?.viewer?.store.setting.currency || ['TWD'];

  if (!req.currency || !currencys.includes(req.currency)) {
    const currency = currencys?.[0];

    req.currency = currency;
    res.cookie('currency', currency);
  }
};
