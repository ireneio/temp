import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/locales';
import ProductAmountSelector from '@meepshop/product-amount-selector';

import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/quantityButton';
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
    variant: VARIANT_TYPE,
    orderable: ORDERABLE_TYPE.isRequired,
    quantity: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    onChangeQuantity: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.shape({}).isRequired,
  };

  generateOptions = () => {
    const {
      t,
      variant,
      orderable,
      quantity,
      onChangeQuantity,
      name,
      container,
      unfoldedVariants,
    } = this.props;

    if (orderable === ORDERABLE) {
      return (
        <div>
          <ProductAmountSelector
            style={styles.amountSelect(unfoldedVariants)}
            variant={variant}
            dropdownClassName={name}
            value={quantity}
            onChange={onChangeQuantity}
            getPopupContainer={() => container.current || document.body}
            size={unfoldedVariants ? 'default' : 'large'}
          />
        </div>
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
