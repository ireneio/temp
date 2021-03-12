import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import moment from 'moment';

import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import { TIME_FORMAT } from './constants';
import * as styles from './styles/couponSuccess';

@withTranslation('payment-default-form-item')
@enhancer
export default class CouponSuccess extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformCurrency: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types

    /** props */
    t: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    // eslint-disable-next-line react/no-unused-prop-types
    activityInfo: PropTypes.arrayOf(
      PropTypes.shape({
        startTime: POSITIVE_NUMBER_TYPE.isRequired,
        endTime: POSITIVE_NUMBER_TYPE.isRequired,
        rule: PropTypes.shape({
          discount: PropTypes.arrayOf(
            PropTypes.shape({
              method: PropTypes.oneOf([0, 1]).isRequired,
              value: POSITIVE_NUMBER_TYPE.isRequired,
            }).isRequired,
          ).isRequired,
        }).isRequired,
        couponSetting: PropTypes.shape({
          useTimesType: PropTypes.number,
          couponUseTimes: PropTypes.number,
          useTimes: PropTypes.number,
        }).isRequired,
        unlimitedDate: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    activity: null,
    discountString: '',
    descriptString: '',
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { t, transformCurrency, activityInfo } = nextProps;
    const activity = activityInfo.find(({ plugin }) =>
      ['productCoupon', 'orderCoupon'].includes(plugin),
    );

    if (activity && !areEqual(activity, preState.activity)) {
      const { startTime, endTime, rule, unlimitedDate } = activity;
      const [discount] = rule.discount;
      const { method, value } = discount;

      return {
        activity,
        discountString: `${t('coupon.this-code-can-discount', {
          currency: method === 1 ? `${value} %OFF` : transformCurrency(value),
        })}`,
        descriptString: unlimitedDate
          ? ''
          : `${t('coupon.activity-period-is')} ${moment(
              startTime * 1000,
            ).format(TIME_FORMAT)}-${moment(endTime * 1000)
              .subtract(1, 'days')
              .format(TIME_FORMAT)}`,
      };
    }

    return null;
  }

  render() {
    const { colors } = this.props;
    const { activity, discountString, descriptString } = this.state;

    if (!activity) return '';

    return (
      <div style={styles.root(colors)}>
        {discountString}

        <br />

        {descriptString}
      </div>
    );
  }
}
