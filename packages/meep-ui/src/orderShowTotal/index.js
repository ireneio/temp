import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  LOCATION_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';

import * as styles from './styles';

const getActivityInfo = activityInfo =>
  activityInfo.reduce(
    (result, { activityId, plugin, discountPrice, title }) => {
      const existActivityIndex = result.findIndex(
        ({ activityId: targetId }) => targetId === activityId,
      );

      if (plugin === 'freeShipping') return result;

      if (existActivityIndex > -1) {
        result[existActivityIndex].discountPrice += discountPrice || 0; // eslint-disable-line no-param-reassign
        return result;
      }

      return [
        ...result,
        {
          activityId,
          plugin,
          discountPrice,
          title,
        },
      ];
    },
    [],
  );

@withTranslation('order-show-total')
@enhancer
@radium
export default class OrderShowTotal extends React.PureComponent {
  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    transformCurrency: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
    productPrice: POSITIVE_NUMBER_TYPE,
    paymentFee: PropTypes.number,
    shipmentFee: POSITIVE_NUMBER_TYPE,
    total: POSITIVE_NUMBER_TYPE,
    isChoosenSipment: PropTypes.bool,
    activityInfo: PropTypes.arrayOf(
      PropTypes.shape({
        // eslint-disable-line react/no-unused-prop-types
        id: ID_TYPE.isRequired,
        plugin: PropTypes.string.isRequired, // TODO
        discountPrice: POSITIVE_NUMBER_TYPE, // TODO
      }).isRequired,
    ).isRequired,
  };

  static defaultProps = {
    style: {},
    productPrice: 0,
    paymentFee: 0,
    shipmentFee: 0,
    total: 0,
    isChoosenSipment: false,
  };

  render() {
    const {
      /** context */
      location,
      transformCurrency,

      /** props */
      t,
      i18n,
      style,
      productPrice,
      paymentFee,
      shipmentFee,
      total,
      isChoosenSipment,
      activityInfo,
    } = this.props;
    const { pathname } = location;

    return (
      <div style={[styles.root, style]}>
        <div style={{ ...styles.item, padding: '0px' }}>
          <div>{t('total')}</div>

          <div>{transformCurrency(productPrice)}</div>
        </div>

        {getActivityInfo(activityInfo).map(
          ({ activityId, plugin, title, discountPrice }) =>
            discountPrice <= 0 ? null : (
              <div key={activityId} style={styles.item}>
                <div>
                  {plugin === 'usePoints'
                    ? t('point')
                    : title[i18n.language] || title.zh_TW}
                </div>

                <div>- {transformCurrency(discountPrice)}</div>
              </div>
            ),
        )}

        {paymentFee === 0 ? null : (
          <div style={styles.item}>
            <div>{t('payment')}</div>

            <div>
              {paymentFee < 0 ? '-' : ''}{' '}
              {transformCurrency(Math.abs(paymentFee))}
            </div>
          </div>
        )}

        {pathname !== '/checkout' ? null : (
          <div style={styles.item}>
            <div>{t('shipment')}</div>

            <div>
              {(() => {
                if (
                  activityInfo.find(({ plugin }) => plugin === 'freeShipping')
                )
                  return t('free-shipment');

                if (isChoosenSipment) return transformCurrency(shipmentFee);

                return t('not-choose-shipment');
              })()}
            </div>
          </div>
        )}

        <div style={[styles.item, styles.total]}>
          <div>
            {pathname !== '/checkout' ? t('subtotal') : t('grand-total')}
          </div>

          <div style={styles.totalPrice}>{transformCurrency(total)}</div>
        </div>
      </div>
    );
  }
}
