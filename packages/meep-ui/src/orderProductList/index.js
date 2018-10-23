import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE } from 'constants/propTypes';

import Product from './Product';
import EmptyCartIcon from './EmptyCartIcon';
import Total from './Total';
import * as LOCALE from './locale';
import * as styles from './styles';

@enhancer
@radium
export default class OrderProductList extends React.PureComponent {
  orderProductListRef = React.createRef();

  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,

    /** props */
    style: PropTypes.shape({}),
    onChange: PropTypes.func,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        cartId: ID_TYPE.isRequired,
      }).isRequired,
    ),
    activityInfo: PropTypes.arrayOf(PropTypes.shape({})),
    priceInfo: PropTypes.shape({}),
    isChoosenSipment: PropTypes.bool,
    productHasError: PropTypes.bool.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    style: {},
    onChange: () => {},
    products: [],
    priceInfo: {},
    activityInfo: null,
    isChoosenSipment: false,
    children: null,
  };

  render() {
    const {
      transformLocale,
      style,
      onChange,
      children,
      productHasError,
      products,
      priceInfo,
      activityInfo,
      isChoosenSipment,
    } = this.props;

    return (
      <div style={[styles.root, style]}>
        <div
          ref={this.orderProductListRef}
          style={styles.productList(products.length === 0)}
        >
          {products.length === 0 ? (
            <>
              <EmptyCartIcon />

              <p style={styles.emptyCartText}>
                {transformLocale(LOCALE.EMPTY_CART)}
              </p>
            </>
          ) : (
            <table style={styles.table}>
              <tbody>
                {products.map(({ productId, ...product }) => (
                  <Product
                    {...product}
                    productId={productId}
                    key={productId}
                    orderProductListRef={this.orderProductListRef}
                    onChange={onChange}
                    productHasError={productHasError}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Total
          {...priceInfo}
          isChoosenSipment={isChoosenSipment}
          activityInfo={activityInfo || []}
        >
          {children}
        </Total>
      </div>
    );
  }
}
