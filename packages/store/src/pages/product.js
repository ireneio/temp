import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
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
    const { isServer, XMeepshopDomain, userAgent, store, query } = context;
    const { pId } = query;
    if (isServer) {
      store.dispatch(Actions.serverProductInitial(context));
    } else {
      const { productsReducer } = store.getState();
      const product = productsReducer.find(_product => _product?.id === pId);
      if (!product) {
        store.dispatch(Actions.getProduct({ id: pId, query }));
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
      fbPixelId: PropTypes.string,
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
      storeSetting: { storeName, storeDescription, faviconUrl, locale },
      location: { host, pathname },
      page,
      product: {
        status,
        coverImage,
        title: { zh_TW: productName },
      },
      productDescription,
      pageAdTrackIDs,
      fbAppId,
    } = this.props;
    const url = host + pathname;
    const productImage = coverImage?.src || '';
    const keywords = page?.seo?.keywords;

    return (
      <>
        <Head>
          <title>{productName || storeName}</title>
          <meta
            name="description"
            content={productDescription || storeDescription}
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
            content={
              productImage ? `${productImage}?w=400` : `//${faviconUrl}?w=400`
            }
          />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta
            property="og:description"
            content={productDescription || storeDescription}
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
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    storeSetting: state?.storeReducer?.settings,
    pageAdTrackIDs: state?.storeReducer?.pageAdTrackIDs,
    location: Utils.uriParser(props),
    fbAppId: state?.storeReducer?.appLogins?.[0]?.appId,
    page: getJoinedPageInProductRoute(state, props),
    // !!Note: product page ONLY
    product: getProduct(state, props),
    productDescription: getProductDescription(state, props),
  };
};

export default connect(mapStateToProps)(Product);
