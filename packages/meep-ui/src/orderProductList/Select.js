import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style } from 'radium';
import { Select as AntdSelect } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
  PURCHASE_ITEMS_TYPE,
} from 'constants/propTypes';

import * as LOCALE from './locale';
import * as styles from './styles/select';
import { item as itemStyle } from './styles/product';

const { Option } = AntdSelect;

@enhancer
@radium
export default class Select extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    updateCartItems: PropTypes.func.isRequired,

    /** props */
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

  state = {
    searchValue: null,
  };

  getErrorMessage = () => {
    const {
      transformLocale,
      stock,
      minPurchaseItems,
      error,
      productHasError,
    } = this.props;

    if (/Product not online/.test(error)) {
      return transformLocale(
        productHasError
          ? LOCALE.PRODUCT_STATUS_OFF_WARNING
          : LOCALE.PRODUCT_STATUS_OFF,
      );
    }

    if (stock <= 0 || (stock > 0 && minPurchaseItems > stock)) {
      return transformLocale(
        productHasError
          ? LOCALE.PRODUCT_SOLD_OUT_WARNING
          : LOCALE.PRODUCT_SOLD_OUT,
      );
    }

    return null;
  };

  render() {
    const {
      colors,
      transformCurrency,
      transformLocale,
      updateCartItems,
      cartId,
      quantity,
      retailPrice,
      stock,
      error,
      onChange,
      productHasError,
      orderProductListRef,
    } = this.props;
    const { searchValue } = this.state;

    const errorMessage = this.getErrorMessage();

    if (errorMessage) {
      return (
        <td style={[itemStyle, styles.error(productHasError)]} colSpan="2">
          {errorMessage}
        </td>
      );
    }

    let { minPurchaseItems, maxPurchaseLimit } = this.props;

    // minPurchaseItems 最小需等於 1
    minPurchaseItems = minPurchaseItems > 0 ? minPurchaseItems : 1;

    // maxPurchaseLimit 最小需等於 minPurchaseItems
    if (typeof maxPurchaseLimit === 'number') {
      maxPurchaseLimit =
        maxPurchaseLimit > minPurchaseItems
          ? maxPurchaseLimit
          : minPurchaseItems;
    } else {
      maxPurchaseLimit = stock;
    }

    const maxPurchase = maxPurchaseLimit < stock ? maxPurchaseLimit : stock;

    const itemAmount = maxPurchase - minPurchaseItems + 1;

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
          <AntdSelect
            defaultValue={quantity}
            value={quantity}
            onChange={value => {
              onChange({ cartId, quantity: value });
              updateCartItems([{ cartId, quantity: value }]);
              this.setState({ searchValue: null });
            }}
            getPopupContainer={() => orderProductListRef.current}
            notFoundContent={transformLocale(LOCALE.NOT_FOUND_CONTENT)}
            onSearch={value => {
              const searchValueTemp = parseInt(value, 10);

              this.setState({
                searchValue:
                  searchValueTemp >= minPurchaseItems &&
                  searchValueTemp <= maxPurchase
                    ? searchValueTemp
                    : null,
              });
            }}
            dropdownMatchSelectWidth={false}
            showSearch
          >
            {searchValue ? (
              <Option value={searchValue}>{searchValue}</Option>
            ) : (
              [].constructor
                .apply({}, new Array(itemAmount >= 100 ? 101 : itemAmount))
                .map((_, index) => {
                  const value = index + minPurchaseItems;

                  return (
                    <Option key={value} value={value} disabled={index >= 100}>
                      {index >= 100
                        ? transformLocale(LOCALE.MORE_OPTIONS)
                        : value}
                    </Option>
                  );
                })
            )}
          </AntdSelect>

          {!error ? null : (
            <div className="ant-form-explain">
              {transformLocale(LOCALE.PRODUCT_OVER_STOCK)}
            </div>
          )}
        </td>

        <td style={[itemStyle, styles.price]}>
          {transformCurrency(retailPrice * quantity)}
        </td>
      </>
    );
  }
}
