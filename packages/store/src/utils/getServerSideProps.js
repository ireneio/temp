// import
import { gql } from '@apollo/client';
import { serialize } from 'cookie';

import { getServerSideDomainContextProps } from '@meepshop/link';

import { getServerSideCookiesContextProps } from 'utils/withCookies';

// definition
export default async (ctx, router) => {
  const { req, res, client } = ctx;

  const { valid } = await fetch(
    `${process.env.MEEPSHOP_API}/auth/validate_token`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        token: req.cookies['x-meepshop-authorization-token'],
      }),
    },
  ).then(result => result.json());

  if (!valid) {
    res.setHeader(
      'Set-Cookie',
      serialize('x-meepshop-authorization-token', '', {
        maxAge: 0,
        expires: new Date(),
        path: '/',
        httpOnly: true,
      }),
    );
    delete req.cookies['x-meepshop-authorization-token'];
  }

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
    ...(await getServerSideCookiesContextProps(ctx)),
    ...getServerSideDomainContextProps(ctx, router),
    pageProps: {
      namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    },
  };
};
