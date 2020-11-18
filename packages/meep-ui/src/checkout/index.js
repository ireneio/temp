// TODO: rewrite after using relay or apollo client

import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import uuid from 'uuid/v4';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import FormDataContext from '@meepshop/form-data';
import { withTranslation } from '@meepshop/utils/lib/i18n';
import withContext from '@store/utils/lib/withContext';
import CheckoutWrapper from '@store/checkout';

import { enhancer } from 'layout/DecoratorsRoot';
import { LOCATION_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';
import findDOMTop from 'utils/findDOMTop';

import OrderDetail from './orderDetail';

@withTranslation('checkout')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(FormDataContext, setFormData => ({ setFormData }))
@enhancer
export default class Checkout extends React.PureComponent {
  formRef = React.createRef();

  idempotentKey = uuid();

  static propTypes = {
    /** context */
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
    orderInfo: null,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    orderInfo: this.props.orderInfo,
    orderOtherDetailInfo: null,
    isSubmitting: false,
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

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  submit = (createOrder, updateUser) => async (
    isPayment,
    info,
    otherDetailInfo,
  ) => {
    const {
      /** context */
      location,
      user,
      isLogin,
      goTo,
      login,

      /** props */
      t,
      adTrack,
      setFormData,
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
        createOrderList: [
          {
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
        ],
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

        updateUser({
          variables: {
            input: {
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
          },
        });

        if (formData?.url) {
          if (!formData.url?.startsWith('line')) {
            setFormData(formData);
            return;
          }

          // hack for linepay in mobile devices
          window.location = formData.url;
        }

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
    } = this.state;

    return (
      <CheckoutWrapper>
        {({
          name,
          mobile,
          address,
          shippableRecipientAddresses,
          createOrder,
          updateUser,
        }) => (
          <OrderDetail
            {...this.props}
            {...orderOtherDetailInfo}
            user={{
              name,
              mobile,
              address,
            }}
            shippableRecipientAddresses={shippableRecipientAddresses}
            errors={errors}
            orderInfo={orderInfo}
            submit={this.submit(createOrder, updateUser)}
            isSubmitting={isSubmitting}
            onChange={data => {
              this.setState(data);
            }}
          />
        )}
      </CheckoutWrapper>
    );
  }
}
