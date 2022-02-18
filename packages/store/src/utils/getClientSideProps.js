// import
import { gql } from '@apollo/client';

import { getClientSideDomainContextProps } from '@meepshop/link';

import { getClientSideCookiesContextProps } from 'utils/withCookies';

// definition
export default async ctx => {
  const { client } = ctx;

  const {
    data: {
      viewer: { store },
    },
  } = await client.query({
    query: gql`
      query checkStore {
        viewer {
          store {
            adminStatus
            metaData {
              storeStatus
            }
          }
        }
      }
    `,
  });

  const { storeStatus } = store.metaData;
  const { adminStatus } = store;

  return {
    ...(storeStatus === 'CLOSE'
      ? {
          closed: adminStatus === 'OPEN' ? 'RESTED' : 'CLOSED',
        }
      : {}),
    ...(await getClientSideCookiesContextProps(ctx)),
    ...getClientSideDomainContextProps(),
    pageProps: {
      namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    },
  };
};
