import React from 'react';
import PropTypes from 'prop-types';
import areEqual from 'fbjs/lib/areEqual';
import moment from 'moment';

import { enhancer } from 'layout';
import { COLOR_TYPE, POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import { TIME_FORMAT } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/couponSuccess';

@enhancer
export default class CouponSuccess extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    transformCurrency: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types

    /** props */
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
    const { transformLocale, transformCurrency, activityInfo } = nextProps;
    const activity = activityInfo.find(({ plugin }) =>
      ['productCoupon', 'orderCoupon'].includes(plugin),
    );

    if (activity && !areEqual(activity, preState.activity)) {
      const {
        startTime,
        endTime,
        couponSetting,
        rule,
        unlimitedDate,
      } = activity;
      const [discount] = rule.discount;
      const { useTimesType, couponUseTimes, useTimes } = couponSetting;
      const { method, value } = discount;

      const timesString =
        useTimesType === 1
          ? ''
          : transformLocale`${LOCALE.ALREADY_USED(couponUseTimes)}${
              LOCALE.COMMA
            }${LOCALE.TIMES_STILL_CAN_USE(useTimes - couponUseTimes)}`;

      const period = unlimitedDate
        ? ''
        : transformLocale`${LOCALE.ACTIVITY_PERIOD_IS} ${moment(
            startTime * 1000,
          ).format(TIME_FORMAT)}-${moment(endTime * 1000)
            .subtract(1, 'days')
            .format(TIME_FORMAT)}`;

      return {
        activity,
        discountString: transformLocale(
          LOCALE.THIS_CODE_CAN_DISCOUNT(
            method === 1 ? `${value} %OFF` : transformCurrency(value),
          ),
        ),
        descriptString: transformLocale`${timesString}${
          useTimesType === 0 && !unlimitedDate ? LOCALE.COMMA : ''
        }${period}`,
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
