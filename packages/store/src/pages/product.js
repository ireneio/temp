import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import * as R from 'ramda';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import ProductDiscontinued from 'components/ProductDiscontinued';
import { getProduct, getJoinedPageInProductRoute } from 'selectors/product';
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
      } else {
        const { templateId, pageId } = Utils.getIn(['design'])(product);
        const _id = templateId || pageId;
        if (R.isNil(R.find(R.propEq('id', _id))(pagesReducer))) {
          store.dispatch(Actions.getPages({ id: _id, query }));
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
  };

  static defaultProps = { error: null };

  componentDidMount() {
    const { product, pageAdTrackIDs } = this.props;
    if (product) {
      Utils.execTrackingCode('ViewProduct', { product, pageAdTrackIDs });
    }
  }

  render() {
    /* Display Error View */
    if (this.props.error) return <Error error={this.props.error} />;

    const {
      storeSetting: { storeName, faviconUrl, locale },
      location: { host, pathname },
      page,
      product: {
        status,
        title: { zh_TW: productName },
      },
      pageAdTrackIDs,
      fbAppId,
    } = this.props;
    const url = host + pathname;
    const { keywords, description, image } = page.seo || {};

    return (
      <React.Fragment>
        <Head>
          <title>{storeName}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="icon" type="image/png" href={`//${faviconUrl}`} />
          <link rel="apple-touch-icon" href={`//${faviconUrl}`} />

          {/* <!-- Facebook Open Graph --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`//${url}`} />
          <meta property="og:title" content={storeName} />
          <meta property="og:image" content={`//${image}`} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={storeName} />
          <meta property="og:locale" content="zh_TW" />
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
  };
};

export default connect(mapStateToProps)(Product);
