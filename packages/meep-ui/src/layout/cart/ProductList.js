import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Button } from 'antd';

import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';
import OrderProductList from 'orderProductList';
import { ISLOGIN_TYPE, LOCATION_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import * as styles from './styles/productList';

@withTranslation('cart')
@enhancer
@radium
export default class ProductList extends React.PureComponent {
  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    toggleCart: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    carts: PropTypes.shape({
      categories: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
      }).isRequired,
    }),

    /** props */
    t: PropTypes.func.isRequired,
    goToInCart: PropTypes.func.isRequired,
  };

  static defaultProps = {
    carts: null,
  };

  state = {
    productHasError: false,
  };

  submit = () => {
    const { goTo, isLogin, goToInCart, carts, toggleCart } = this.props;

    const checkProductError = !carts
      ? false
      : carts.categories.products.some(
          ({ type, error }) => error && type === 'product',
        );

    if (checkProductError) return this.setState({ productHasError: true });

    if (isLogin === NOTLOGIN) return goToInCart('login', 'product list');

    toggleCart(false);
    return goTo({ pathname: '/checkout' });
  };

  render() {
    const {
      /** context */
      location,
      carts,

      /** props */
      t,
      toggleCart,
    } = this.props;
    const { productHasError } = this.state;
    const { categories, priceInfo, activityInfo } = carts || { categories: {} };
    const { products = [] } = categories;
    const { pathname } = location;

    return (
      <OrderProductList
        style={styles.root}
        products={products}
        priceInfo={priceInfo}
        activityInfo={activityInfo}
        productHasError={productHasError}
      >
        {pathname === 'checkout' ? null : (
          <Button
            type="primary"
            onClick={
              products.length === 0 ? () => toggleCart(false) : this.submit
            }
          >
            {t(products.length === 0 ? 'go-back-to-store' : 'bill')}
          </Button>
        )}
      </OrderProductList>
    );
  }
}
