import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';

import { TIME_FORMAT } from './constants';

@withTranslation('payment-default-form-item')
@enhancer
export default class CouponError extends React.PureComponent {
  static propTypes = {
    /** context */
    transformCurrency: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
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
    const { t, code } = this.props;
    const { params } = this.state;

    switch (code) {
      case 4015:
        return `${t('coupon.this-code-not-exist')}${t(
          'coupon.plz-ask-service-or-delete',
        )}`;

      case 4016: {
        const { startTime, endTime } = params;

        return `${t('coupon.this-code-activity-period')} ${moment(
          startTime * 1000,
        ).format(TIME_FORMAT)}-${moment(endTime * 1000)
          .subtract(1, 'days')
          .format(TIME_FORMAT)} ${t('coupon.plz-delete-then-checkout')}`;
      }

      case 4017:
        return `${t('coupon.your-member-group-can-not-use-this-code')}${t(
          'coupon.plz-delete-then-checkout',
        )}`;

      case 4018:
        return `${t('coupon.this-code-usetimes-full')}${t(
          'coupon.plz-ask-service-or-delete',
        )}`;

      case 4019: {
        const { type, condition } = params;

        if (type === '2')
          return `${t('coupon.this-code-has-to-buy-specific-products')}${t(
            'coupon.plz-delete-then-checkout',
          )}`;

        const { transformCurrency } = this.props;

        return `${t('coupon.this-code-has-to-satisfy', {
          currency:
            type === '1'
              ? `${condition}${t('coupon.amount-of-products')}` // TODO: need to remove?
              : transformCurrency(condition),
        })}${t('coupon.plz-delete-then-checkout')}`;
      }

      case 4020:
        return `${t('coupon.this-code-is-the-same')}${t(
          'coupon.plz-delete-then-checkout',
        )}`;

      default:
        return null;
    }
  }
}
