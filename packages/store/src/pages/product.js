import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import * as R from 'ramda';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import ProductDiscontinued from 'components/ProductDiscontinued';
import {
  getProduct,
  getProductDescription,
  getJoinedPageInProductRoute,
} from 'selectors/product';
import * as Actions from 'ducks/actions';

class Product extends React.Component {
  static getInitialProps = async context => {
    const {
      isServer,
      XMeepshopDomain,
      userAgent,
      cookie,
      store,
      query,
    } = context;
    const { pId } = query;
    if (isServer) {
      store.dispatch(
        Actions.serverProductInitial({ XMeepshopDomain, cookie, query }),
      );
    } else {
      const { pagesReducer, productsReducer } = store.getState();
      const product = R.find(R.propEq('id', pId))(productsReducer);
      if (R.isNil(product)) {
        store.dispatch(Actions.getProduct({ id: pId, query }));
      } else if (
        (!Utils.getIn(['design'])(product) ||
          (!Utils.getIn(['design', 'pageId'])(product) &&
            !Utils.getIn(['design', 'templateId'])(product))) &&
        R.isNil(R.find(R.propEq('pageType', 'template'))(pagesReducer))
      ) {
        store.dispatch(Actions.getPages({ pageType: 'template', query }));
      } else {
        const { templateId, pageId } = Utils.getIn(['design'])(product);
        const id = templateId || pageId;

        if (R.isNil(R.find(R.propEq('id', id))(pagesReducer))) {
          store.dispatch(Actions.getPages({ id, query }));
        }
      }
    }
    return { pId, userAgent, XMeepshopDomain };
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
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.object,
      variantInfo: PropTypes.object,
      status: PropTypes.number.isRequired,
    }).isRequired,
    locale: PropTypes.string.isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    const { product, pageAdTrackIDs } = this.props;
    if (product) {
      Utils.execTrackingCode('ViewProduct', { product, pageAdTrackIDs });
    }
  }

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl, locale },
      location: { host, pathname },
      page,
      product: {
        status,
        galleryInfo,
        title: { zh_TW: productName },
      },
      productDescription,
      pageAdTrackIDs,
      fbAppId,
    } = this.props;
    const url = host + pathname;
    const productImage = Utils.getIn(['media', 0])(galleryInfo) || '';
    const { keywords, description, image } = page.seo || {};

    return (
      <React.Fragment>
        <Head>
          <title>{productName || storeName}</title>
          <meta
            name="description"
            content={description || productDescription}
          />
          <meta name="keywords" content={keywords} />
          <link rel="icon" type="image/png" href={`//${faviconUrl}`} />
          <link rel="apple-touch-icon" href={`//${faviconUrl}`} />

          {/* <!-- Facebook Open Graph --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://${url}`} />
          <meta property="og:title" content={productName || storeName} />
          <meta
            property="og:image"
            content={`https://${image || productImage || faviconUrl}?w=400`}
          />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta
            property="og:description"
            content={description || productDescription}
          />
          <meta property="og:site_name" content={storeName} />
          <meta property="og:locale" content={locale} />
          {/* <!-- End - Facebook Open Graph --> */}
        </Head>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
        {status ? (
          <Container {...this.props} />
        ) : (
          <ProductDiscontinued productName={productName} locale={locale} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    storeSetting: Utils.getIn(['storeReducer', 'settings'])(state),
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    location: Utils.uriParser(props),
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
    page: getJoinedPageInProductRoute(state, props),
    // !!Note: product page ONLY
    product: getProduct(state, props),
    productDescription: getProductDescription(state, props),
  };
};

export default connect(mapStateToProps)(Product);
