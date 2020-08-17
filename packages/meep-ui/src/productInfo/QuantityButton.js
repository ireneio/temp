import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import ProductAmountSelect from '@meepshop/product-amount-select';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/category';
import {
  VARIANT_TYPE,
  ORDERABLE_TYPE,
  ORDERABLE,
  OUT_OF_STOCK,
  LIMITED,
} from './constants';

@withTranslation('product-info')
@enhancer
@radium
export default class QuantityButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    variant: VARIANT_TYPE.isRequired,
    orderable: ORDERABLE_TYPE.isRequired,
    quantity: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    carts: PropTypes.shape({}),
    onChangeQuantity: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    carts: null,
  };

  generateOptions = () => {
    const {
      t,
      variant,
      orderable,
      quantity,
      carts,
      onChangeQuantity,
      name,
      container,
    } = this.props;
    const { id, stock, maxPurchaseLimit, minPurchaseItems } = variant;

    if (orderable === ORDERABLE) {
      const quantityInCart =
        cart?.categories.products.find(product => product.variantId === id)
          ?.quantity || 0;

      return (
        <ProductAmountSelect
          variant={{
            ...variant,
            maxPurchaseLimit:
              maxPurchaseLimit > quantityInCart
                ? maxPurchaseLimit - quantityInCart
                : 0,
            minPurchaseItems:
              minPurchaseItems > quantityInCart
                ? minPurchaseItems - quantityInCart
                : 0,
            stock: stock > quantityInCart ? stock - quantityInCart : 0,
          }}
          dropdownClassName={name}
          value={quantity}
          onChange={onChangeQuantity}
          getPopupContainer={() => container.current || document.body}
        />
      );
    }

    if (orderable === OUT_OF_STOCK)
      return <div style={styles.overStock}>{t('out-of-stock')}</div>;

    if (orderable === LIMITED)
      return <div style={styles.overStock}>{t('over-stock')}</div>;

    return null;
  };

  render() {
    const { colors, t } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.label(colors)}>{t('quantity')}</div>

        {this.generateOptions()}
      </div>
    );
  }
}
