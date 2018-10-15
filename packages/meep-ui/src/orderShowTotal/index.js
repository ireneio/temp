import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  LOCATION_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';

import * as LOCALE from './locale';
import * as styles from './styles';

const getActivityInfo = activityInfo =>
  activityInfo.reduce((result, { id, plugin, discountPrice, title }) => {
    const existActivityIndex = result.findIndex(
      ({ id: activityID }) => activityID === id,
    );

    if (plugin === 'freeShipping') return result;

    if (existActivityIndex > -1) {
      result[existActivityIndex].discountPrice += discountPrice || 0; // eslint-disable-line no-param-reassign
      return result;
    }

    return [
      ...result,
      {
        id,
        plugin,
        discountPrice,
        title,
      },
    ];
  }, []);

@enhancer
@radium
export default class OrderShowTotal extends React.PureComponent {
  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,

    /** props */
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
        title: LOCALE.isRequired,
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
      location,
      transformLocale,
      transformCurrency,
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
        <div style={styles.item}>
          <div>{transformLocale(LOCALE.TOTAL)}</div>

          <div>{transformCurrency(productPrice)}</div>
        </div>

        {getActivityInfo(activityInfo).map(
          ({ id, plugin, title, discountPrice }) =>
            discountPrice <= 0 ? null : (
              <div key={id} style={styles.item}>
                <div>
                  {transformLocale(
                    plugin === 'usePoints' ? LOCALE.POINT : title,
                  )}
                </div>

                <div>- {transformCurrency(discountPrice)}</div>
              </div>
            ),
        )}

        {paymentFee === 0 ? null : (
          <div style={styles.item}>
            <div>{transformLocale(LOCALE.PAYMENT)}</div>

            <div>
              {paymentFee < 0 ? '-' : ''}{' '}
              {transformCurrency(Math.abs(paymentFee))}
            </div>
          </div>
        )}

        {pathname !== '/checkout' ? null : (
          <div style={styles.item}>
            <div>{transformLocale(LOCALE.SHIPMENT)}</div>

            <div>
              {(() => {
                if (
                  activityInfo.find(({ plugin }) => plugin === 'freeShipping')
                )
                  return transformLocale(LOCALE.FREE_SHIPMENT);

                if (isChoosenSipment) return transformCurrency(shipmentFee);

                return transformLocale(LOCALE.NOT_CHOOSE_SHIPMENT);
              })()}
            </div>
          </div>
        )}

        <div style={[styles.item, styles.total]}>
          <div>{transformLocale(LOCALE.GRAND_TOTAL)}</div>

          <div style={styles.totalPrice}>{transformCurrency(total)}</div>
        </div>
      </div>
    );
  }
}
