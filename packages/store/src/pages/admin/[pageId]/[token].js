import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { defaultAdTrack } from '@meepshop/context/lib/AdTrack';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import { getJoinedPageInPagesRoute } from 'selectors/pages';
import { getProduct, getJoinedPageInProductRoute } from 'selectors/product';
import * as Actions from 'ducks/actions';
import useAdminPreview from 'hooks/useAdminPreview';

const Page = React.memo(
  ({ error, product: reduxProduct, page: reduxPage, ...props }) => {
    const { experimentProduct, experimentPage } = useAdminPreview();
    const product = experimentProduct || reduxProduct;
    const page = experimentPage || reduxPage;

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
  },
);

Page.getInitialProps = async ctx => {
  const { query, store, XMeepshopDomain, userAgent, client } = ctx;

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

  if (pId) store.dispatch(Actions.serverProductInitial(ctx));

  const { pagesReducer } = store.getState();

  if (pagesReducer.error) return {};

  if (!pagesReducer.find(page => page.id === pageId))
    store.dispatch(Actions.getPages({ ...ctx, id: pageId }));

  ctx.res.header('X-Frame-Options', undefined);

  return {
    userAgent,
    XMeepshopDomain,
    pageId,
    pId,
  };
};

const mapStateToProps = (state, props) => {
  if (props.error) return props;

  const error = Utils.getStateError(state);

  if (error) return { error };

  return !props.pId
    ? {
        page: getJoinedPageInPagesRoute(state, props),
      }
    : {
        page: getJoinedPageInProductRoute(state, props),
        product: getProduct(state, props),
      };
};

export default connect(mapStateToProps)(Page);
