import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';

import { TIME_FORMAT } from './constants';
import * as LOCALE from './locale';

@enhancer
export default class CouponError extends React.PureComponent {
  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,

    /** props */
    code: PropTypes.oneOf([4015, 4016, 4017, 4018, 4019, 4020]).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    params: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOf([
          'useTimes',
          'startTime',
          'endTime',
          'type',
          'condition',
        ]).isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ),
  };

  static defaultProps = {
    params: null,
  };

  state = {
    originParams: null, // eslint-disable-line react/no-unused-state
    params: {},
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { params } = nextProps;

    if (params && !areEqual(params, preState.originParams)) {
      return {
        originParams: params,
        params: params.reduce(
          (paramResult, { name, value }) => ({
            ...paramResult,
            [name]: value,
          }),
          {},
        ),
      };
    }

    return null;
  }

  render() {
    const { transformLocale, code } = this.props;
    const { params } = this.state;

    switch (code) {
      case 4015:
        return transformLocale`${LOCALE.THIS_CODE_NOT_EXIST}${LOCALE.PLZ_ASK_SERVICE_OR_DELETE}`;

      case 4016: {
        const { startTime, endTime } = params;

        return transformLocale`${LOCALE.THIS_CODE_ACTIVITY_PERIOD} ${moment(
          startTime * 1000,
        ).format(TIME_FORMAT)}-${moment(endTime * 1000)
          .subtract(1, 'days')
          .format(TIME_FORMAT)} ${LOCALE.PLZ_DELETE_THEN_CHECKOUT}`;
      }

      case 4017:
        return transformLocale`${LOCALE.YOUR_MEMBER_GROUP_CAN_NOT_USE_THIS_CODE}${LOCALE.PLZ_DELETE_THEN_CHECKOUT}`;

      case 4018:
        return transformLocale`${LOCALE.THIS_CODE_USETIMES_FULL}${LOCALE.PLZ_ASK_SERVICE_OR_DELETE}`;

      case 4019: {
        const { type, condition } = params;

        if (type === '2')
          return transformLocale`${LOCALE.THIS_CODE_HAS_TO_BUY_SPECIFIC_PRODUCTS}${LOCALE.PLZ_DELETE_THEN_CHECKOUT}`;

        const { transformCurrency } = this.props;

        return transformLocale`${LOCALE.THIS_CODE_HAS_TO_SATISFY(
          type === '1'
            ? `${condition}${transformLocale(LOCALE.AMOUNT_OF_PRODUCTS)}` // TODO: need to remove?
            : transformCurrency(condition),
        )}${LOCALE.PLZ_DELETE_THEN_CHECKOUT}`;
      }

      case 4020:
        return transformLocale`${LOCALE.THIS_CODE_IS_THE_SAME}${LOCALE.PLZ_DELETE_THEN_CHECKOUT}`;

      default:
        return null;
    }
  }
}
