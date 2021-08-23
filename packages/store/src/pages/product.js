import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { isEmpty } from 'fbjs';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { Role as RoleContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

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

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error) return;

    const {
      dispatchAction,
      role,
      location: { query },
    } = this.props;

    if (prevProps.role !== role)
      dispatchAction('getProduct', { id: query?.pId, query });
  }

  render() {
    const { error, product } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    if (isEmpty(product)) return <Spin indicator={<LoadingOutlined spin />} />;

    const {
      product: { status, coverImage, title },
      productDescription,
    } = this.props;
    const productImage = coverImage?.scaledSrc?.w480 || '';

    // eslint-disable-next-line camelcase
    const productName = title?.zh_TW;

    return (
      <>
        <Head>
          {!productName ? null : <title>{productName}</title>}

          {!productDescription ? null : (
            <meta
              key="description"
              name="description"
              content={productDescription}
            />
          )}

          {!productName ? null : (
            <meta key="keywords" name="keywords" content={productName} />
          )}

          {!productName ? null : (
            <meta key="og:title" property="og:title" content={productName} />
          )}

          {!productImage ? null : (
            <meta key="og:image" property="og:image" content={productImage} />
          )}

          {!productDescription ? null : (
            <meta
              key="og:description"
              property="og:description"
              content={productDescription}
            />
          )}
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
    location: Utils.uriParser(props),
    page: getJoinedPageInProductRoute(state, props),
    // !!Note: product page ONLY
    product: getProduct(state, props),
    productDescription: getProductDescription(state, props),
  };
};

export default connect(mapStateToProps, dispatch => ({
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
}))(
  withTranslation('common')(
    withContext(RoleContext, role => ({ role }))(Product),
  ),
);
