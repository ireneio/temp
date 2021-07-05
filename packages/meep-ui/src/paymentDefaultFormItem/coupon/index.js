import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';

import { withTranslation } from '@meepshop/locales';

import { ID_TYPE } from 'constants/propTypes';

import CouponError from './CouponError';
import CouponSuccess from './CouponSuccess';

const { Item: FormItem } = Form;
const { Search } = Input;

@withTranslation('payment-default-form-item')
@radium
export default class Coupon extends React.PureComponent {
  static propTypes = {
    /** props */
    t: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
    computeOrderList: PropTypes.func.isRequired,
    checkId: ID_TYPE,
    errorObj: PropTypes.shape({}),
    activityInfo: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  };

  static defaultProps = {
    style: {},
    checkId: null,
    errorObj: null,
    activityInfo: null,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    checking: Boolean(this.props.form.getFieldValue('coupon')),
    validateStatus: 'success',
    help: undefined,
    nowCheckId: null, // eslint-disable-line react/no-unused-state
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const {
      form: { getFieldValue, setFields },
      errorObj,
      activityInfo,
      checkId,
    } = nextProps;
    const { checking } = preState;
    const coupon = getFieldValue('coupon');

    if (checking || checkId !== preState.nowCheckId) {
      if (errorObj) {
        setFields([
          {
            name: ['coupon'],
            value: coupon,
            errors: ['coupon code error'],
          },
        ]);

        return {
          nowCheckId: checkId,
          checking: false,
          validateStatus: 'error',
          help: <CouponError {...errorObj} />,
        };
      }

      if ((activityInfo || []).length !== 0 || coupon === '') {
        setFields([
          {
            name: ['coupon'],
            value: coupon,
            errors: null,
          },
        ]);

        return {
          nowCheckId: checkId,
          checking: false,
          validateStatus: 'success',
          help:
            coupon === '' ? (
              undefined
            ) : (
              <CouponSuccess activityInfo={activityInfo} />
            ),
        };
      }

      return null;
    }

    if (!coupon && preState.help !== '')
      return {
        validateStatus: 'success',
        help: undefined,
      };

    return null;
  }

  askConfirmCoupon = ({ target }) => {
    const {
      t,
      form: { setFields },
    } = this.props;
    const { value: coupon } = target;

    if (coupon !== '') {
      setFields([
        {
          name: ['coupon'],
          value: coupon,
          errors: ['coupon code does not be confirmed'],
        },
      ]);
      this.setState({
        validateStatus: 'warning',
        help: t('coupon.ask-confirm-coupon'),
      });
    } else {
      setFields([{ name: ['coupon'], value: coupon, errors: [] }]);
      this.setState({
        validateStatus: 'success',
        help: undefined,
      });
    }
  };

  render() {
    const { t, style, computeOrderList } = this.props;
    const { checking, validateStatus, help } = this.state;

    return (
      <FormItem
        style={style}
        name={['coupon']}
        validateStatus={validateStatus}
        help={help}
        hasFeedback={false}
      >
        <Search
          placeholder={t('coupon.placeholder')}
          enterButton={t('coupon.coupon-button')}
          onChange={this.askConfirmCoupon}
          onBlur={({ target }) => {
            if (target.value === '') {
              this.setState({ checking: true }, () =>
                computeOrderList({ coupon: target.value }),
              );
            }
          }}
          onSearch={coupon => {
            if (!checking) {
              this.setState({ checking: true }, () =>
                computeOrderList({ coupon }),
              );
            }
          }}
        />
      </FormItem>
    );
  }
}
