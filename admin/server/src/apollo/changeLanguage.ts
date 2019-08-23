// typescript import
import { NextContext } from 'next';
import { DefaultQuery } from 'next/router';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { CustomReq } from './withApollo';

// import
import { gql } from 'apollo-boost';
import idx from 'idx';

// graphql typescript
import { getAdminLocale } from './__generated__/getAdminLocale';

// definition
export default async (
  client: ApolloClient<NormalizedCacheObject>,
  { req }: NextContext<DefaultQuery, CustomReq>,
) => {
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
  const locale = idx(result, _ => _.data.viewer.store.locale) || 'zh_TW';

  if (locale === req.language) return;

  if (req.i18n) await req.i18n.changeLanguage(locale);
};
