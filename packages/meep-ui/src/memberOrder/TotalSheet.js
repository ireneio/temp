import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import memoizeOne from 'memoize-one';
import { areEqual } from 'fbjs';

import { contextProvider } from 'context';
import localeFragment from 'fragments/localeFragment';

import * as LOCALE from './locale';
import styles from './styles/totalSheet.less';

const { enhancer } = contextProvider(['locale', 'currency']);

// TODO: add to cart and checkout
export const totalSheetFragment = gql`
  fragment totalSheetFragment on Order {
    priceInfo {
      productPrice
      shipmentFee
      paymentFee
      adjust
      total
    }

    activityInfo {
      id
      plugin
      discountPrice
      title {
        ...localeFragment
      }
    }
  }
  ${localeFragment}
`;

@enhancer
export default class TotalSheet extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({}).isRequired,
  };

  getActivityInfo = memoizeOne(
    activityInfo =>
      activityInfo.reduce((result, { id, plugin, discountPrice, title }) => {
        // filter
        if (!discountPrice || plugin === 'freeShipping') return result;

        const activity = result.find(({ id: activityId }) => activityId === id);

        // first add
        if (!activity) {
          switch (plugin) {
            case 'usePoints':
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: LOCALE.REWARD,
                },
              ];

            case 'productCoupon':
            case 'orderCoupon':
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: LOCALE.COUPON,
                },
              ];

            default:
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title,
                },
              ];
          }
        }

        // count discountPrice
        activity.discountPrice += discountPrice;
        return result;
      }, []),
    areEqual,
  );

  render() {
    const {
      /** context */
      transformLocale,
      transformCurrency,

      /** props */
      order: {
        priceInfo: { productPrice, shipmentFee, paymentFee, adjust, total },
        activityInfo,
      },
    } = this.props;

    return (
      <div className={styles.root}>
        <div>
          <div>{transformLocale(LOCALE.PRODUCTS_PRICE)}</div>

          <div>{transformCurrency(productPrice)}</div>
        </div>

        {this.getActivityInfo(activityInfo).map(
          ({ id, title, discountPrice }) => (
            <div key={id}>
              <div>{transformLocale(title)}</div>
              <div>{transformCurrency(-1 * discountPrice)}</div>
            </div>
          ),
        )}

        <div>
          <div>{transformLocale(LOCALE.SHIPMENT_FEE)}</div>

          <div>
            {activityInfo?.find(({ plugin }) => plugin === 'freeShipping')
              ? transformLocale(LOCALE.FREE_SHIPMENT_FEE)
              : transformCurrency(shipmentFee)}
          </div>
        </div>

        {!paymentFee ? null : (
          <div>
            <div>{transformLocale(LOCALE.PAYMENT_FEE)}</div>

            <div>
              {`${paymentFee < 0 ? '-' : ''} ${transformCurrency(
                Math.abs(paymentFee),
              )}`}
            </div>
          </div>
        )}

        {!adjust ? null : (
          <div>
            <div>{transformLocale(LOCALE.ADJUST)}</div>

            <div>
              {`${adjust < 0 ? '-' : '+'} ${transformCurrency(
                Math.abs(adjust),
              )}`}
            </div>
          </div>
        )}

        <div className={styles.total}>
          <div>{transformLocale(LOCALE.TOTAL)}</div>

          <div>{transformCurrency(total)}</div>
        </div>
      </div>
    );
  }
}
