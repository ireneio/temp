import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import { getJoinedProductsPage } from 'selectors/products';
import * as Actions from 'ducks/actions';

class Products extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, store, query } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverProductsInitial(context));
    else {
      const { pagesReducer } = store.getState();

      if (pagesReducer.error) return {};

      if (!pagesReducer.find(page => page.pageType === 'products'))
        store.dispatch(Actions.getPages({ pageType: 'PRODUCTS', query }));
    }

    return { XMeepshopDomain, userAgent };
  };

  static propTypes = {
    error: PropTypes.string,
    page: PropTypes.shape({
      seo: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error, isNewPageModulesEnabled, experimentPage } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { page: reduxPage } = this.props;
    const page = !isNewPageModulesEnabled ? experimentPage : reduxPage;

    if (!page) return null;

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
    page: getJoinedProductsPage(state, props),
  };
};

export default connect(mapStateToProps)(withTranslation('common')(Products));
