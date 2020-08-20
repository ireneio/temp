import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import { ID_TYPE } from 'constants/propTypes';

import Product from './Product';
import EmptyCartIcon from './EmptyCartIcon';
import Total from './Total';
import * as styles from './styles';

@withTranslation('order-product-list')
@radium
export default class OrderProductList extends React.PureComponent {
  static propTypes = {
    /** props */
    t: PropTypes.func.isRequired,
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
      t,
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
        <div style={styles.productList(products.length === 0)}>
          {products.length === 0 ? (
            <>
              <EmptyCartIcon />

              <p style={styles.emptyCartText}>{t('empty-cart')}</p>
            </>
          ) : (
            <table style={styles.table}>
              <tbody>
                {products.map(({ productId, ...product }, index) => (
                  <Product
                    {...product}
                    productId={productId}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${productId}-${index}`}
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
