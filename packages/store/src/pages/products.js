import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import { getJoinedProductsPage } from 'selectors/products';
import * as Actions from 'ducks/actions';

class Products extends React.Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, store, query } = context;

    if (isServer) {
      store.dispatch(Actions.serverProductsInitial(context));
    } else {
      const { pagesReducer } = store.getState();
      if (!pagesReducer.find(page => page.pageType === 'products')) {
        store.dispatch(Actions.getPages({ pageType: 'PRODUCTS', query }));
      }
    }

    return { XMeepshopDomain, userAgent };
  };

  static propTypes = {
    error: PropTypes.string,
    storeSetting: PropTypes.shape({
      storeName: PropTypes.string.isRequired,
      faviconUrl: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      host: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    page: PropTypes.shape({
      seo: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, storeDescription, faviconUrl },
      location: { host, pathname },
      page,
      i18n,
    } = this.props;
    const url = host + pathname;
    const { addressTitle = '' } = page;
    const { keywords, description = storeDescription, image } = page.seo || {};

    return (
      <>
        <Head>
          <title>{addressTitle || storeName}</title>
          <meta name="description" content={description || storeDescription} />
          <meta name="keywords" content={keywords} />
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />

          {/* <!-- Facebook Open Graph --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://${url}`} />
          <meta property="og:title" content={addressTitle || storeName} />
          <meta
            property="og:image"
            content={`${image ? `https://${image}` : faviconUrl}?w=400`}
          />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta
            property="og:description"
            content={description || storeDescription}
          />
          <meta property="og:site_name" content={storeName} />
          <meta property="og:locale" content={i18n.language} />
          {/* <!-- End - Facebook Open Graph --> */}
        </Head>
        <Container {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    storeSetting: Utils.getIn(['storeReducer', 'settings'])(state),
    location: Utils.uriParser(props),
    page: getJoinedProductsPage(state, props),
  };
};

export default connect(mapStateToProps)(withTranslation('common')(Products));
