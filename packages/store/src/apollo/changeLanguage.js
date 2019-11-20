import gql from 'graphql-tag';

export default async (client, { req }) => {
  if (!req) return;

  const result = await client.query({
    query: gql`
      query getStoreLocale {
        viewer {
          id
          store {
            id
            setting {
              locale
            }
          }
        }
      }
    `,
  });
  const locale = result.data?.viewer?.store.setting.locale || ['zh_TW'];

  if (locale.includes(req.language)) return;

  if (req.i18n) await req.i18n.changeLanguage(locale[0]);
};
