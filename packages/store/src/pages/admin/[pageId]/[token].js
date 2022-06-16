import React from 'react';
import { gql } from '@apollo/client';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { defaultAdTrack } from '@meepshop/context/lib/AdTrack';
import ActionButton from '@meepshop/action-button';

import { Container, Error } from 'components';
import useAdminPreview from 'hooks/useAdminPreview';

const Page = React.memo(({ error, ...props }) => {
  const { product, backToTopButtonEnabled, page } = useAdminPreview();

  if (error) return <Error error={error} />;

  return (
    <AdTrackContext.Provider value={defaultAdTrack}>
      <div
        style={{ userSelect: 'none', pointerEvents: 'none', height: '100%' }}
      >
        <Container {...props} product={product} page={page} />

        <ActionButton
          backToTopButtonEnabled={backToTopButtonEnabled}
          goToButton={page?.goToButton || null}
        />
      </div>
    </AdTrackContext.Provider>
  );
});

Page.getInitialProps = async ctx => {
  const { query, client } = ctx;

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

  ctx.res.setHeader('X-Frame-Options', '');

  return {
    pageId,
    pId,
  };
};

export default Page;
