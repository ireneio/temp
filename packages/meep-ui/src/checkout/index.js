// TODO: rewrite after using relay or apollo client

import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { areEqual } from 'fbjs';
import uuid from 'uuid/v4';

import { adTrack as adTrackContext } from '@meepshop/context';
import { withTranslation } from '@meepshop/utils/lib/i18n';
import withContext from '@store/utils/lib/withContext';
import CheckoutWrapper from '@store/checkout';

import { enhancer } from 'layout/DecoratorsRoot';
import { USER_TYPE, LOCATION_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';
import findDOMTop from 'utils/findDOMTop';
import createFormData from 'utils/createFormData';

import OrderDetail from './orderDetail';

@withTranslation('checkout')
@withContext(adTrackContext, adTrack => ({ adTrack }))
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
    goTo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    adTrack: PropTypes.shape({}).isRequired,
    orderInfo: PropTypes.shape({}),
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

  submit = createOrder => async (isPayment, info, otherDetailInfo) => {
    const {
      /** context */
      location,
      user,
      isLogin,
      goTo,
      login,
      dispatchAction,

      /** props */
      t,
      adTrack,
    } = this.props;
    const {
      orderInfo: prevOrderInfo,
      orderOtherDetailInfo: prevOrderOtherDetailInfo,
      isSubmitting,
    } = this.state;

    if (isSubmitting) return;

    const orderInfo = !info ? prevOrderInfo : { info };
    const orderOtherDetailInfo = !otherDetailInfo
      ? prevOrderOtherDetailInfo
      : otherDetailInfo;

    // TODO: should rewrite form data controller
    this.setState({ isSubmitting: true, orderInfo });

    const { host: domain } = location;
    const {
      products,
      choosePayment,
      isSaveAsReceiverTemplate,
    } = orderOtherDetailInfo;
    const {
      paymentId,
      shipmentId,
      coupon,
      points,

      userEmail,
      userPassword,
      userName,
      userMobile,
      userAddressAndZipCode,
      userStreet,

      name,
      mobile,
      notes,

      // convenience-store or address
      addressAndZipCode,
      street,
      CVSStoreID,
      CVSStoreName,
      CVSAddress,
      cvsType,
      cvsCode,

      // invoice
      invoice,
      invoiceTitle,
      invoiceVAT,
      invoiceAddress,
      invoiceEInvoiceNumber,
      invoiceDonate,

      // gmo payment
      isRememberCard,
      cardHolderName,
      cardNumber,
      securityCode,
      expire,
      installmentCode,
    } = orderInfo.info;

    const { error, data } = await createOrder({
      variables: {
        createOrderList: {
          idempotentKey: this.idempotentKey,
          environment: {
            domain,
          },
          isPayment,
          products: products
            .filter(({ type }) => type !== 'gift')
            .map(({ productId, variantId, quantity = 1 }) => ({
              productId,
              variantId,
              quantity,
            })),
          coupon,
          points,
          ...(!addressAndZipCode
            ? {}
            : {
                address: {
                  zipCode: addressAndZipCode.zipCode,
                  countryId: addressAndZipCode.address[0],
                  cityId: addressAndZipCode.address[1],
                  areaId: addressAndZipCode.address[2],
                  street,
                },
              }),
          payments: [
            {
              paymentId,
              ...(choosePayment.template !== 'gmo' ||
              choosePayment.accountInfo.gmo.paymentType !== 'Credit'
                ? {}
                : {
                    gmo: {
                      isRememberCard,
                      cardHolderName,
                      cardNumber: cardNumber?.join(''),
                      securityCode,
                      expireYear: expire?.format('YYYY'),
                      expireMonth: expire?.format('M'),
                      ...(!installmentCode
                        ? {}
                        : {
                            installmentCode:
                              installmentCode instanceof Array
                                ? installmentCode[installmentCode.length - 1]
                                : installmentCode,
                          }),
                    },
                  }),
            },
          ],
          shipments: [
            {
              shipmentId,
              recipient: {
                saveRecipient: isSaveAsReceiverTemplate,
                name,
                email: userEmail || user.email,
                mobile,
                comment: notes,
                receiverStoreID: CVSStoreID,
                receiverStoreName: CVSStoreName,
                receiverStoreAddress: CVSAddress,
              },
            },
          ],
          cvsType,
          cvsCode,
          userInfo: {
            name: userName || name,
            email: userEmail || user.email,
            mobile: userMobile || mobile,
            password: userPassword,
          },
          ...(!invoice
            ? {}
            : {
                invoice: {
                  type: invoice[0],
                  ...(invoice[1] === 'MEMBERSHIP' ||
                  invoice[1] === 'MOBILE_BARCODE' ||
                  invoice[1] === 'CITIZEN_DIGITAL_CERTIFICATE'
                    ? {
                        method: 'CARRIER',
                        carrier: {
                          type: invoice[1],
                          code: invoiceEInvoiceNumber,
                        },
                      }
                    : {
                        method: invoice[1],
                      }),

                  // method = TRIPLICATE
                  address: invoiceAddress,
                  title: invoiceTitle,
                  ban: invoiceVAT,

                  // method = DONATION
                  loveCode: invoiceDonate,
                },
              }),
        },
      },
    });

    if (this.isUnmounted) return;

    const { id, error: createOrderError, formData } =
      data?.createOrderList?.[0] || {};

    if (error || createOrderError || !id) {
      const errorMessage = error?.[0]?.message || createOrderError || '';

      notification.error({
        message: t('pay-fail'),
        description: /(<st_code>|七天後關|門市不存在|門市關轉店或為外島|取貨門市店代碼)/.test(
          errorMessage,
        )
          ? '原取件門市暫停服務，請重新選擇！'
          : errorMessage,
      });

      this.idempotentKey = uuid();
      this.setState({ isSubmitting: false });
    } else {
      if (global.window) window.sessionStorage.clear();

      const nextStep = (firstPurchase = false) => {
        if (this.isUnmounted) return;

        dispatchAction('updateUser', {
          user: {
            name: userName,
            additionalInfo: {
              mobile: userMobile,
            },
            address: {
              countryId: userAddressAndZipCode.address[0],
              cityId: userAddressAndZipCode.address[1],
              areaId: userAddressAndZipCode.address[2],
              zipCode: userAddressAndZipCode.zipCode,
              street: userStreet,
            },
          },
        });

        if (formData?.url) {
          if (/CashSystemFrontEnd\/Query/.test(formData.url)) {
            dispatchAction('emptyCart');
            goTo({ pathname: `/ezpay/cvcode/${id}` });
            return;
          }

          if (formData.type === 'POST') {
            this.setState({ formData });
            return;
          }

          if (!formData.url?.startsWith('line')) {
            window.location = formData.url;
            return;
          }

          // hack for linepay in mobile devices
          window.location = formData.url;
        }

        dispatchAction('emptyCart', points);
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
          callback: () => {
            adTrack.completeRegistration();
            nextStep(true);
          },
          from: 'checkout',
        });
        return;
      }

      nextStep();
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
      <CheckoutWrapper>
        {({ shippableRecipientAddresses, createOrder }) => (
          <>
            <OrderDetail
              {...this.props}
              {...orderOtherDetailInfo}
              shippableRecipientAddresses={shippableRecipientAddresses}
              errors={errors}
              orderInfo={orderInfo}
              submit={this.submit(createOrder)}
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
                    value:
                      params[key] && key === 'orderdesc' ? ' ' : params[key],
                  })),
                )}
              </form>
            )}
          </>
        )}
      </CheckoutWrapper>
    );
  }
}
