import React from 'react';
import PropTypes from 'prop-types';
import { gql, useApolloClient } from '@apollo/client';
import uuid from 'uuid/v4';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import FormDataContext from '@meepshop/form-data';
import { withTranslation } from '@meepshop/locales';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import CheckoutWrapper from '@store/checkout';
import { formatGmo } from '@meepshop/gmo-credit-card-form';

import { enhancer } from 'layout/DecoratorsRoot';
import { LOCATION_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import OrderDetail from './orderDetail';

@withTranslation('checkout')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(FormDataContext, setFormData => ({ setFormData }))
@withHook(() => ({ client: useApolloClient() }))
@enhancer
export default class Checkout extends React.PureComponent {
  formRef = React.createRef();

  idempotentKey = uuid();

  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    goTo: PropTypes.func.isRequired,

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

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  submit = (createOrder, updateUser, checkoutFields) => async (
    isPayment,
    info,
    otherDetailInfo,
  ) => {
    const {
      /** context */
      location,
      isLogin,
      goTo,

      /** props */
      client,
      t,
      adTrack,
      setFormData,
    } = this.props;
    const {
      orderInfo: prevOrderInfo,
      orderOtherDetailInfo: prevOrderOtherDetailInfo,
      isSubmitting,
    } = this.state;

    if (isSubmitting) return null;

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

    if (isLogin === NOTLOGIN && userEmail && userPassword) {
      const { data: createUserData } = await client.mutate({
        mutation: gql`
          mutation firstPurchaseSignup($search: [NewUser]) {
            createUserList(createUserList: $search) {
              id
            }
          }
        `,
        variables: {
          search: {
            type: 'SHOPPER',
            email: userEmail,
            password: userPassword,
          },
        },
      });

      if ((createUserData?.createUserList || []).length === 0)
        return t('ducks:signup-failure-message');

      adTrack.completeRegistration();

      const { data: loginData } = await client.mutate({
        mutation: gql`
          mutation login($input: LoginInput!) {
            login(input: $input) @client {
              status
            }
          }
        `,
        variables: {
          input: { email: userEmail, password: userPassword },
        },
      });

      if (loginData.login.status !== 'OK')
        return t('ducks:invalid-email-or-password');
    }

    const { user } = this.props;

    const { error, data } = await createOrder({
      variables: {
        input: {
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
          payment: {
            paymentId,
            redirectUrl: ['allpay', 'ecpay2'].includes(choosePayment.template)
              ? `https://${domain}/api/redirect/checkout/thank-you-page/[orderId]`
              : `https://${domain}/checkout/thank-you-page/[orderId]`,
            ...(choosePayment.template !== 'gmo' ||
            choosePayment.accountInfo.gmo.paymentType !== 'Credit'
              ? {}
              : {
                  gmo: formatGmo({
                    isRememberCard,
                    cardHolderName,
                    cardNumber,
                    securityCode,
                    expire,
                    installmentCode,
                  }),
                }),
          },
          shipment: {
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
          cvsType,
          cvsCode,
          userId: user.id,
          userInfo: Object.keys(checkoutFields).every(
            key => key === '__typename' || checkoutFields[key] === 'HIDDEN',
          )
            ? {
                name: user?.name,
                email: user?.email,
                mobile: user?.additionalInfo?.mobile,
              }
            : {
                name: userName,
                email: userEmail,
                mobile: userMobile,
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

    if (this.isUnmounted) return null;

    const { id, error: createOrderError, formData, paymentServiceTradeToken } =
      data?.createOrder.order || {};

    if (error || createOrderError || !id) {
      const errorMessage = error?.[0]?.message || createOrderError || '';

      this.idempotentKey = uuid();
      this.setState({ isSubmitting: false });

      return errorMessage;
    }

    if (global.window) window.sessionStorage.clear();

    const input = ['name', 'mobile', 'address'].reduce((result, fieldName) => {
      if (checkoutFields?.[fieldName] === 'HIDDEN') return result;

      switch (fieldName) {
        case 'name':
          return {
            ...result,
            name: userName,
          };

        case 'mobile':
          return {
            ...result,
            additionalInfo: {
              mobile: userMobile,
            },
          };

        case 'address':
          return {
            ...result,
            address: !userAddressAndZipCode
              ? null
              : {
                  countryId: userAddressAndZipCode.address[0],
                  cityId: userAddressAndZipCode.address[1],
                  areaId: userAddressAndZipCode.address[2],
                  zipCode: userAddressAndZipCode.zipCode,
                  street: userStreet,
                },
          };

        default:
          return result;
      }
    }, {});

    await updateUser({
      variables: {
        input,
      },
    });

    if (this.isUnmounted) return null;

    if (formData?.url) {
      if (!formData.url?.startsWith('line')) {
        setFormData(formData);
        return null;
      }

      // hack for linepay in mobile devices
      window.location = formData.url;
    }

    // ecpay 2.0
    if (paymentServiceTradeToken) {
      goTo({
        pathname: `/ecpay/${paymentServiceTradeToken}/${id}`,
      });
      return null;
    }

    goTo({
      pathname: `/checkout/thank-you-page/${id}`,
    });

    return null;
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
          checkoutFields,
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
            checkoutFields={checkoutFields}
            errors={errors}
            orderInfo={orderInfo}
            submit={this.submit(createOrder, updateUser, checkoutFields)}
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
