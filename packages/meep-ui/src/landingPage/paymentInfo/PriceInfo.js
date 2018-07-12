import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import * as LOCALE from './locale';
import * as styles from './styles/priceInfo';

import { formItem as formItemStyle } from './../styles';

@enhancer
@radium
export default class PriceInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,

    /** props */
    activityInfo: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
      }).isRequired,
    ).isRequired,
    priceInfo: PropTypes.shape({
      productPrice: POSITIVE_NUMBER_TYPE, // TODO
      paymentFee: PropTypes.number.isRequired,
      shipmentFee: POSITIVE_NUMBER_TYPE.isRequired,
      total: POSITIVE_NUMBER_TYPE.isRequired,
    }).isRequired,
  };

  render() {
    const {
      transformLocale,
      transformCurrency,
      activityInfo,
      priceInfo,
    } = this.props;
    const { productPrice, paymentFee, shipmentFee, total } = priceInfo;

    return (
      <div style={[formItemStyle, styles.root]}>
        <div>
          {productPrice < 0 ? null : (
            <div style={styles.block}>
              <span>{transformLocale(LOCALE.PRICE)}</span>

              <span style={styles.content}>
                {transformCurrency(productPrice || 0)}
              </span>
            </div>
          )}

          {activityInfo.map(
            ({ id, discountPrice, plugin, title }) =>
              !discountPrice ? null : (
                <div key={id} style={styles.block}>
                  <span>
                    {transformLocale(
                      ['productCoupon', 'orderCoupon'].includes(plugin)
                        ? LOCALE.COUPON_CODE
                        : title,
                    )}
                  </span>

                  <span style={styles.content}>
                    - {transformCurrency(discountPrice)}
                  </span>
                </div>
              ),
          )}

          {paymentFee === 0 ? null : (
            <div style={styles.block}>
              <span>{transformLocale(LOCALE.PAYMENT_FEE)}</span>

              <span style={styles.content}>
                {paymentFee < 0 ? '-' : ''}{' '}
                {transformCurrency(Math.abs(paymentFee))}
              </span>
            </div>
          )}

          {shipmentFee === 0 ? null : (
            <div style={styles.block}>
              <span>{transformLocale(LOCALE.SHIPMENT_FEE)}</span>

              <span style={styles.content}>
                {transformCurrency(shipmentFee)}
              </span>
            </div>
          )}

          <div style={styles.block}>
            <span>{transformLocale(LOCALE.TOTAL)}</span>

            <span style={styles.content}>{transformCurrency(total)}</span>
          </div>
        </div>
      </div>
    );
  }
}
