// typescript import
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { CustomCtx } from './withApollo';

// import
import gql from 'graphql-tag';

// graphql typescript
import { getAdminLocale } from './__generated__/getAdminLocale';

// definition
export default async (
  client: ApolloClient<NormalizedCacheObject>,
  { req }: CustomCtx['ctx'],
): Promise<void> => {
  if (!req) return;

  const result = await client.query<getAdminLocale>({
    query: gql`
      query getAdminLocale {
        viewer {
          id
          store {
            id
            locale
          }
        }
      }
    `,
  });
  const locale = result?.data.viewer?.store?.locale || 'zh_TW';

  if (locale === req.language) return;

  if (req.i18n) await req.i18n.changeLanguage(locale);
};
