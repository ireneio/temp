import { gql } from 'apollo-boost';

export default async (client, ctx) => {
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

  if (locale.includes(ctx.req.language)) return;

  await ctx.req.i18n.changeLanguage(locale[0]);
};
