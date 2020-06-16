import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import { formItem as formItemStyle } from '../styles';

import * as styles from './styles/priceInfo';

@withTranslation('landing-page')
@enhancer
@radium
export default class PriceInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    transformCurrency: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
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
      /** context */
      transformCurrency,

      /** props */
      t,
      i18n,
      activityInfo,
      priceInfo,
    } = this.props;
    const { productPrice, paymentFee, shipmentFee, total } = priceInfo;

    return (
      <div style={[formItemStyle, styles.root]}>
        <div>
          {productPrice < 0 ? null : (
            <div style={styles.block}>
              <span>{t('price')}</span>

              <span style={styles.content}>
                {transformCurrency(productPrice || 0)}
              </span>
            </div>
          )}

          {activityInfo.map(({ id, discountPrice, plugin, title }) =>
            !discountPrice ? null : (
              <div key={id} style={styles.block}>
                <span>
                  {['productCoupon', 'orderCoupon'].includes(plugin)
                    ? t('coupon-code')
                    : title[i18n.language] || title.zh_TW}
                </span>

                <span style={styles.content}>
                  - {transformCurrency(discountPrice)}
                </span>
              </div>
            ),
          )}

          {paymentFee === 0 ? null : (
            <div style={styles.block}>
              <span>{t('payment-fee')}</span>

              <span style={styles.content}>
                {paymentFee < 0 ? '-' : ''}{' '}
                {transformCurrency(Math.abs(paymentFee))}
              </span>
            </div>
          )}

          {shipmentFee === 0 ? null : (
            <div style={styles.block}>
              <span>{t('shipment-fee')}</span>

              <span style={styles.content}>
                {transformCurrency(shipmentFee)}
              </span>
            </div>
          )}

          <div style={styles.block}>
            <span>{t('total')}</span>

            <span style={styles.content}>{transformCurrency(total)}</span>
          </div>
        </div>
      </div>
    );
  }
}
