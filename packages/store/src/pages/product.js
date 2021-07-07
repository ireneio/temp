import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { isEmpty } from 'fbjs';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { withTranslation } from '@meepshop/locales';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import ProductDiscontinued from 'components/ProductDiscontinued';
import {
  getProduct,
  getProductDescription,
  getJoinedPageInProductRoute,
} from 'selectors/product';
import * as Actions from 'ducks/actions';

class Product extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, store, query } = context;
    const { pId } = query;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverProductInitial(context));
    else {
      const { productsReducer } = store.getState();
      const product = productsReducer.find(_product => _product?.id === pId);

      if (!product) store.dispatch(Actions.getProduct({ id: pId, query }));
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
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.object,
      status: PropTypes.number.isRequired,
    }).isRequired,
    productDescription: PropTypes.string.isRequired,
  };

  static defaultProps = { error: null };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { dispatchAction, isLogin } = nextProps;
    const query = nextProps.location?.query;

    if (prevState?.isLogin && prevState.isLogin !== isLogin)
      dispatchAction('getProduct', { id: query.pId, query });

    return { isLogin };
  }

  render() {
    const { error, product } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    if (isEmpty(product)) return <Spin indicator={<LoadingOutlined spin />} />;

    const {
      storeSetting: { storeName, storeDescription, faviconUrl },
      location: { host, pathname },
      product: { status, coverImage, title },
      productDescription,
      i18n,
    } = this.props;
    const url = host + pathname;
    const productImage = coverImage?.scaledSrc?.w480 || '';

    // eslint-disable-next-line camelcase
    const productName = title?.zh_TW;

    return (
      <>
        <Head>
          <title>{productName || storeName}</title>
          <meta
            name="description"
            content={productDescription || storeDescription}
          />
          <meta name="keywords" content={productName || storeName} />
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />

          {/* <!-- Facebook Open Graph --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://${url}`} />
          <meta property="og:title" content={productName || storeName} />
          <meta property="og:image" content={productImage || faviconUrl} />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta
            property="og:description"
            content={productDescription || storeDescription}
          />
          <meta property="og:site_name" content={storeName} />
          <meta property="og:locale" content={i18n.language} />
          {/* <!-- End - Facebook Open Graph --> */}
        </Head>

        {status ? (
          <Container {...this.props} />
        ) : (
          <ProductDiscontinued productName={productName} />
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
    location: Utils.uriParser(props),
    page: getJoinedPageInProductRoute(state, props),
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    // !!Note: product page ONLY
    product: getProduct(state, props),
    productDescription: getProductDescription(state, props),
  };
};

export default connect(mapStateToProps, dispatch => ({
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
}))(withTranslation('common')(Product));
