import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style } from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import ProductAmountSelect from '@meepshop/product-amount-select';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
  PURCHASE_ITEMS_TYPE,
} from 'constants/propTypes';

import * as styles from './styles/select';
import { item as itemStyle } from './styles/product';

@withTranslation('order-product-list')
@enhancer
@radium
export default class Select extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformCurrency: PropTypes.func.isRequired,
    updateCartItems: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    error: PropTypes.string,
    cartId: ID_TYPE.isRequired,
    quantity: PropTypes.number.isRequired,
    retailPrice: POSITIVE_NUMBER_TYPE.isRequired,
    stock: PURCHASE_ITEMS_TYPE.isRequired,
    minPurchaseItems: PURCHASE_ITEMS_TYPE.isRequired,
    maxPurchaseLimit: PURCHASE_ITEMS_TYPE.isRequired,
    productHasError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    orderProductListRef: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    error: null,
  };

  getErrorMessage = () => {
    const { t, stock, minPurchaseItems, error, productHasError } = this.props;

    if (/Product not online/.test(error))
      return productHasError
        ? t('product-status-off-warning')
        : t('product-status-off');

    if (stock <= 0 || (stock > 0 && minPurchaseItems > stock))
      return productHasError
        ? t('product-sold-out-warning')
        : t('product-sold-out');

    return null;
  };

  render() {
    const {
      /** context */
      colors,
      transformCurrency,
      updateCartItems,

      /** props */
      t,
      cartId,
      quantity,
      retailPrice,
      error,
      onChange,
      productHasError,
      orderProductListRef,
      ...props
    } = this.props;

    const errorMessage = this.getErrorMessage();

    if (errorMessage)
      return (
        <td style={[itemStyle, styles.error(productHasError)]} colSpan="2">
          {errorMessage}
        </td>
      );

    return (
      <>
        <Style
          scopeSelector=".cart-product-select"
          rules={styles.modifyAntdStyle(colors)}
        />

        <td
          style={itemStyle}
          className={`cart-product-select ant-form-item-control ${
            !error ? '' : 'has-error'
          }`}
        >
          <ProductAmountSelect
            variant={props}
            defaultValue={quantity}
            value={quantity}
            onChange={value => {
              onChange({ cartId, quantity: value });
              updateCartItems([{ cartId, quantity: value }]);
            }}
            getPopupContainer={() => orderProductListRef.current}
          />

          {!error ? null : (
            <div className="ant-form-explain">{t('product-over-stock')}</div>
          )}
        </td>

        <td style={[itemStyle, styles.price]}>
          {transformCurrency(retailPrice * quantity)}
        </td>
      </>
    );
  }
}
