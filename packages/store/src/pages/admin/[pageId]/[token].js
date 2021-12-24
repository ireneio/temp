import React from 'react';
import { gql } from '@apollo/client';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { defaultAdTrack } from '@meepshop/context/lib/AdTrack';

import { Container, Error } from 'components';
import useAdminPreview from 'hooks/useAdminPreview';

const Page = React.memo(({ error, ...props }) => {
  const { product, page } = useAdminPreview();

  if (error) return <Error error={error} />;

  return (
    <AdTrackContext.Provider value={defaultAdTrack}>
      <div
        style={{ userSelect: 'none', pointerEvents: 'none', height: '100%' }}
      >
        <Container {...props} product={product} page={page} />
      </div>
    </AdTrackContext.Provider>
  );
});

Page.getInitialProps = async ctx => {
  const { query, XMeepshopDomain, userAgent, client } = ctx;

  if (typeof window !== 'undefined')
    return { error: { status: 'ERROR_PAGE_NOT_FOUND' } };

  const { pageId, token, pId } = query;
  const { data } = await client.query({
    query: gql`
      query checkAdminToken($token: String!) {
        isAdministratorToken(token: $token)
      }
    `,
    variables: {
      token,
    },
  });

  if (!data?.isAdministratorToken)
    return { error: { status: 'ERROR_PAGE_NOT_FOUND' } };

  ctx.res.header('X-Frame-Options', undefined);

  return {
    userAgent,
    XMeepshopDomain,
    pageId,
    pId,
  };
};

export default Page;
