import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import { log } from '@meepshop/logger/lib/gqls/log';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import { getJoinedPageInPagesRoute } from 'selectors/pages';
import * as Actions from 'ducks/actions';
import * as CONST from 'constants';

class Pages extends React.Component {
  static getInitialProps = async context => {
    const { res, XMeepshopDomain, userAgent, store, query, client } = context;
    const { path, pId } = query;

    if (pId) {
      // Redirect /pages/{PRODUCT-NAME}?pId={PRODUCT-ID} to /product/{PRODUCT-ID}
      if (typeof window === 'undefined') {
        client.mutate({
          mutation: log,
          variables: {
            input: {
              type: 'WARN',
              name: 'URL_REDIRECT',
              data: {
                message: 'product redirect',
              },
            },
          },
        });
        res.redirect(302, `/product/${pId}`);
      } else {
        Utils.goTo({ pathname: `/product/${pId}` });
      }
      return {};
    }

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverPagesInitial(context));
    else {
      const { pagesReducer } = store.getState();

      if (!pagesReducer.find(page => page.path === path))
        store.dispatch(Actions.getPages({ pageType: 'CUSTOM', path, query }));
    }

    return { path, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    page: PropTypes.shape(CONST.PAGE_TYPE).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error, experimentPage } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { page: reduxPage } = this.props;
    const page = experimentPage || reduxPage;
    const { tabTitle = '' } = page;
    const { keywords, description, image } = page.seo || {};

    return (
      <>
        <Head>
          {!tabTitle ? null : <title>{tabTitle}</title>}

          {!description ? null : (
            <meta key="description" name="description" content={description} />
          )}

          <meta key="keywords" name="keywords" content={keywords} />

          {!tabTitle ? null : (
            <meta key="og:title" property="og:title" content={tabTitle} />
          )}

          {!image ? null : (
            <meta key="og:image" property="og:image" content={image} />
          )}

          {!description ? null : (
            <meta
              key="og:description"
              property="og:description"
              content={description}
            />
          )}
        </Head>

        <Container {...this.props} page={page} />
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    page: getJoinedPageInPagesRoute(state, props),
  };
};

export default connect(mapStateToProps)(withTranslation('common')(Pages));
