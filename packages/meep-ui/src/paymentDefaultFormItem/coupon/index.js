import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';
import { enhancer } from 'layout/DecoratorsRoot';

import { ID_TYPE } from 'constants/propTypes';

import CouponError from './CouponError';
import CouponSuccess from './CouponSuccess';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;
const { Search } = Input;

@enhancer
@radium
export default class Coupon extends React.PureComponent {
  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,

    /** props */
    style: PropTypes.shape({}),
    form: PropTypes.shape({
      getFieldValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFields: PropTypes.func.isRequired,
    }).isRequired,
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
    help: '',
    nowCheckId: null, // eslint-disable-line react/no-unused-state
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { form, errorObj, activityInfo, checkId } = nextProps;
    const { checking } = preState;
    const { getFieldValue, setFields } = form;
    const coupon = getFieldValue('coupon');

    if (checking || checkId !== preState.nowCheckId) {
      if (errorObj) {
        setFields({
          coupon: {
            value: coupon,
            errors: [new Error('coupon code error')],
          },
        });

        return {
          nowCheckId: checkId,
          checking: false,
          validateStatus: 'error',
          help: <CouponError {...errorObj} />,
        };
      }

      if ((activityInfo || []).length !== 0 || coupon === '') {
        setFields({
          coupon: {
            value: coupon,
            errors: null,
          },
        });

        return {
          nowCheckId: checkId,
          checking: false,
          validateStatus: 'success',
          help:
            coupon === '' ? '' : <CouponSuccess activityInfo={activityInfo} />,
        };
      }

      return null;
    }

    if (!coupon && preState.help !== '') {
      return {
        validateStatus: 'success',
        help: '',
      };
    }

    return null;
  }

  askConfirmCoupon = ({ target }) => {
    const { transformLocale, form } = this.props;
    const { setFields } = form;
    const { value: coupon } = target;

    if (coupon !== '') {
      setFields({
        coupon: { errors: [new Error('coupon code does not be confirmed')] },
      });

      this.setState({
        validateStatus: 'warning',
        help: transformLocale(LOCALE.ASK_CONFIRM_COUPON),
      });
    } else {
      setFields({ coupon: { errors: null } });

      this.setState({
        validateStatus: 'success',
        help: '',
      });
    }
  };

  render() {
    const { transformLocale, style, form, computeOrderList } = this.props;
    const { checking, validateStatus, help } = this.state;
    const { getFieldDecorator } = form;

    return (
      <FormItem
        style={style}
        validateStatus={validateStatus}
        help={help}
        hasFeedback
      >
        {getFieldDecorator('coupon')(
          <Search
            placeholder={transformLocale(LOCALE.COUPON)}
            enterButton={transformLocale(LOCALE.COUPON_BUTTON)}
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
          />,
        )}
      </FormItem>
    );
  }
}
