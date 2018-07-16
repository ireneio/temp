import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Select } from 'antd';

import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/category';
import * as LOCALE from './locale';
import {
  VARIANT_TYPE,
  ORDERABLE_TYPE,
  ORDERABLE,
  OUT_OF_STOCK,
  LIMITED,
} from './constants';

@radium
export default class QuantityButton extends React.Component {
  static propTypes = {
    variantInfo: VARIANT_TYPE.isRequired,
    orderable: ORDERABLE_TYPE.isRequired,
    quantity: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    cart: PropTypes.shape({}),
    transformLocale: PropTypes.func.isRequired,
    onChangeQuantity: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
  };

  static defaultProps = {
    cart: null,
  };

  state = {
    result: null,
  };

  onSearch = ({ value, max, min }) => {
    const result = value && parseInt(value, 10);

    this.setState(
      result && result >= min && result <= max
        ? {
            result,
          }
        : {
            result: null,
          },
    );
  };

  generateOptions = () => {
    const {
      variantInfo,
      orderable,
      quantity,
      cart,
      transformLocale,
      onChangeQuantity,
      name,
      container,
    } = this.props;
    const { result } = this.state;
    const { id, stock, maxPurchaseLimit, minPurchaseItems } = variantInfo;

    if (orderable === ORDERABLE) {
      const variantInCart =
        cart &&
        cart.categories.products.find(product => product.variantId === id);
      const quantityInCart = variantInCart ? variantInCart.quantity : 0;

      // 上限為最高購買量或庫存，取低減購物車內含量
      const max =
        maxPurchaseLimit < stock
          ? maxPurchaseLimit - quantityInCart
          : stock - quantityInCart;
      // 下限為最低購買量減購物車內含量
      const min =
        minPurchaseItems > quantityInCart
          ? minPurchaseItems - quantityInCart
          : 1;

      if (max - min > 99) {
        const vision = [];

        for (let value = min; value <= min + 99; value += 1) {
          vision.push(
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>,
          );
        }

        return (
          <Select
            style={{ minWidth: '60px' }}
            showSearch
            dropdownMatchSelectWidth={false}
            dropdownClassName={name}
            value={quantity}
            onChange={onChangeQuantity}
            notFoundContent={transformLocale(LOCALE.NOT_FOUND_CONTENT)}
            onSearch={value => {
              this.onSearch({ value, max, min });
            }}
            getPopupContainer={() =>
              container ? document.getElementById(container) : document.body
            }
          >
            {result ? (
              <Select.Option value={result}>{result}</Select.Option>
            ) : (
              vision.concat([
                <Select.Option
                  key="MORE"
                  title={transformLocale(LOCALE.MORE_OPTIONS)}
                  disabled
                >
                  {transformLocale(LOCALE.MORE_OPTIONS)}
                </Select.Option>,
              ])
            )}
          </Select>
        );
      }

      const options = [];

      for (let value = min; value <= max; value += 1) {
        options.push(
          <Select.Option key={value} value={value}>
            {value}
          </Select.Option>,
        );
      }

      return (
        <Select
          dropdownMatchSelectWidth={false}
          dropdownClassName={name}
          onChange={onChangeQuantity}
          value={quantity}
          getPopupContainer={() =>
            container ? document.getElementById(container) : document.body
          }
        >
          {options}
        </Select>
      );
    }

    if (orderable === OUT_OF_STOCK) {
      return (
        <div style={styles.overStock}>
          {transformLocale(LOCALE.OUT_OF_STOCK)}
        </div>
      );
    }

    if (orderable === LIMITED) {
      return (
        <div style={styles.overStock}>{transformLocale(LOCALE.OVER_STOCK)}</div>
      );
    }

    return null;
  };

  render() {
    const { colors, transformLocale } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.label(colors)}>
          {transformLocale(LOCALE.QUANTITY)}
        </div>
        {this.generateOptions()}
      </div>
    );
  }
}
