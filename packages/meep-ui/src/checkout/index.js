// TODO: rewrite after using relay or apollo client

import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { areEqual } from 'fbjs';
import uuid from 'uuid/v4';

import { enhancer } from 'layout/DecoratorsRoot';
import { USER_TYPE, LOCATION_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';
import findDOMTop from 'utils/findDOMTop';
import fetchStreamName from 'utils/fetchStreamName';
import { TAIWAN } from 'locale/country';
import getCreateOrderQuery from 'utils/getCreateOrderQuery';
import createFormData from 'utils/createFormData';

import OrderDetail from './orderDetail';

import * as LOCALE from './locale';

@enhancer
export default class Checkout extends React.PureComponent {
  formRef = React.createRef();

  idempotentKey = uuid();

  static propTypes = {
    /** context */
    user: USER_TYPE,
    location: LOCATION_TYPE.isRequired,
    cname: PropTypes.string.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    getData: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** props */
    orderInfo: PropTypes.shape({}),
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  static defaultProps = {
    user: null,
    orderInfo: null,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    orderInfo: this.props.orderInfo,
    orderOtherDetailInfo: null,
    isSubmitting: false,
    formData: null,
    errors: {},
  };

  componentDidMount() {
    if (global.window) {
      const { location } = this.props;

      if (location.hash !== 'choose-shipment-store') return;

      window.scrollTo(
        0,
        findDOMTop(document.getElementById('choose-shipment-store')),
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { formData } = this.state;

    if (formData && !areEqual(formData, prevState.formData))
      this.formRef.current.submit();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  goToInCheckout = (isPayment, info, otherDetailInfo) => {
    const { orderInfo, orderOtherDetailInfo } = this.state;

    this.submit({
      isPayment,
      orderInfo: !info ? orderInfo : { info },
      orderOtherDetailInfo: !otherDetailInfo
        ? orderOtherDetailInfo
        : otherDetailInfo,
    });
  };

  submit = async ({ isPayment, orderInfo, orderOtherDetailInfo }) => {
    const {
      location,
      locale,
      user,
      cname,
      isLogin,
      transformLocale,
      getData,
      goTo,
      adTrack,
      login,
      dispatchAction,
    } = this.props;
    const { isSubmitting } = this.state;

    if (isSubmitting) return;

    // TODO: should rewrite form data controller
    this.setState({ isSubmitting: true, orderInfo });

    const { host: domain } = location;
    const {
      products,
      choosePayment,
      isSaveAsReceiverTemplate,
    } = orderOtherDetailInfo;
    const { userEmail, userPassword, ...fieldValue } = orderInfo.info;

    let { postalCode = '' } = orderInfo.info;

    if (Object.values(TAIWAN).includes(fieldValue.address?.[0]))
      await fetchStreamName(fieldValue.address).then(({ zip }) => {
        postalCode = zip;
      });

    const orderData = {
      ...fieldValue,
      idempotentKey: this.idempotentKey,
      postalCode,
      domain,
      locale,
      userEmail: userEmail || user.email,
      userPassword,
      products,
      choosePayment,
      isPayment,
      isSaveAsReceiverTemplate,
    };

    const result = await getData(...getCreateOrderQuery(orderData));

    if (this.isUnmounted) return;

    const { id, orderNo, error, formData } =
      result?.data?.createOrderList?.[0] || {};
    const { errors } = result || {};

    if (error || errors || !id) {
      const errorMessage = error || errors?.[0]?.message || '';

      notification.error({
        message: transformLocale(LOCALE.PAY_FILE),
        description: /(<st_code>|七天後關|門市不存在|門市關轉店或為外島|取貨門市店代碼)/.test(
          errorMessage,
        )
          ? '原取件門市暫停服務，請重新選擇！'
          : errorMessage,
      });

      this.idempotentKey = uuid();
      this.setState({ isSubmitting: false });
    } else {
      adTrack(
        'Purchase',
        {
          ...orderOtherDetailInfo,
          cname,
          orderNo,
        },
        () => {
          const nextStep = (firstPurchase = false) => {
            if (this.isUnmounted) return;

            const addRecipient = () => {
              if (!isSaveAsReceiverTemplate) return;

              dispatchAction('addRecipient', {
                recipient: {
                  name: fieldValue.name,
                  mobile: fieldValue.mobile,
                  address: {
                    postalCode,
                    yahooCode: {
                      country: fieldValue.address[0],
                      city: fieldValue.address[1] || '',
                      county: fieldValue.address[2] || '',
                      street: fieldValue.addressDetail,
                    },
                  },
                },
              });
            };

            if (formData && formData.url) {
              if (/CashSystemFrontEnd\/Query/.test(formData.url)) {
                addRecipient();
                dispatchAction('emptyCart');
                goTo({ pathname: `/ezpay/cvcode/${id}` });
                return;
              }

              if (formData.type === 'GET') {
                window.location = formData.url;
                return;
              }

              this.setState({ formData });
              return;
            }

            addRecipient();
            dispatchAction('emptyCart', orderData.points);
            goTo({
              pathname: `/checkout/thank-you-page/${id}`,
              params: {
                search: { firstPurchase },
              },
            });
          };

          if (isLogin === NOTLOGIN) {
            login({
              email: userEmail,
              password: userPassword,
              callback: () => nextStep(true),
              from: 'checkout',
            });
            return;
          }

          nextStep();
        },
      );
    }
  };

  render() {
    const {
      orderInfo,
      orderOtherDetailInfo,
      errors,
      isSubmitting,
      formData,
    } = this.state;
    const { url, params } = formData || { params: {} };

    return (
      <>
        <OrderDetail
          {...this.props}
          {...orderOtherDetailInfo}
          errors={errors}
          orderInfo={orderInfo}
          goToInCheckout={this.goToInCheckout}
          isSubmitting={isSubmitting}
          onChange={data => {
            this.setState(data);
          }}
        />

        {!formData ? null : (
          <form
            ref={this.formRef}
            action={url}
            acceptCharset={/hitrust/.test(url) ? 'big5' : 'utf8'}
            method="POST"
          >
            {createFormData(
              Object.keys(params).map(key => ({
                name: key,
                value: params[key] && key === 'orderdesc' ? ' ' : params[key],
              })),
            )}
          </form>
        )}
      </>
    );
  }
}
