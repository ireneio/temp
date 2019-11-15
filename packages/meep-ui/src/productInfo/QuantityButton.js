import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Select } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

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
@radium
export default class QuantityButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    variantInfo: VARIANT_TYPE.isRequired,
    orderable: ORDERABLE_TYPE.isRequired,
    quantity: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    cart: PropTypes.shape({}),
    onChangeQuantity: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.shape({}).isRequired,
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
      t,
      variantInfo,
      orderable,
      quantity,
      cart,
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
            showSearch
            dropdownMatchSelectWidth={false}
            dropdownClassName={name}
            value={quantity}
            onChange={onChangeQuantity}
            notFoundContent={t('not-found-content')}
            onSearch={value => {
              this.onSearch({ value, max, min });
            }}
            getPopupContainer={() => container.current || document.body}
          >
            {result ? (
              <Select.Option value={result}>{result}</Select.Option>
            ) : (
              vision.concat([
                <Select.Option key="MORE" title={t('more-options')} disabled>
                  {t('more-options')}
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
          getPopupContainer={() => container.current || document.body}
        >
          {options}
        </Select>
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
