import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { message } from 'antd';

import { contextProvider } from 'context';
import Link from 'link';
import createFormData from 'utils/createFormData';

import { PAYMENT_CAN_PAID_LATER } from './constants';
import * as LOCALE from './locale';
import styles from './styles/actions.less';

const { enhancer } = contextProvider(['locale', 'func']);

export const actionsFragment = gql`
  fragment actionsFragment on Order {
    id
    status
    paymentInfo {
      status
      list {
        accountInfo {
          allpay {
            choosePayment: ChoosePayment
          }
          ezpay {
            choosePayment: ezpayPaymentType
          }
          gmo {
            choosePayment: paymentType
          }
        }
        template
        paymentId
      }
    }
    shipmentInfo {
      status
    }
    products {
      id
      quantity
      type
    }
  }
`;

export const actionsOrderApplyListFragment = gql`
  fragment actionsOrderApplyListFragment on OrderApply {
    orderId
    orderProductId
    status
    quantity
  }
`;

// TODO: move to constants
export const outformDataObjectFragment = gql`
  fragment outformDataObjectFragment on outformDataObjectType {
    url
    params {
      MerchantID
      MerchantTradeNo
      MerchantTradeDate
      PaymentType
      TotalAmount
      TradeDesc
      ItemName
      ReturnURL
      ChoosePayment
      CheckMacValue
      PaymentInfoURL
      OrderResultURL
      ClientRedirectURL
      ExpireDate
      CreditInstallment
      Redeem
      UnionPay
      ClientBackURL
      AlipayItemName
      AlipayItemCounts
      AlipayItemPrice
      Email
      PhoneNo
      UserName
      IgnorePayment
      DeviceSource
      NeedExtraPaidInfo
      HashKey
      HashIV
      Type
      storeid
      ordernumber
      amount
      orderdesc
      depositflag
      queryflag
      e03
      returnURL
      merUpdateURL
      payment_code
      trans_code
      mode
      MerchantNumber
      OrderNumber
      Amount
      ApproveFlag
      DepositFlag
      Englishmode
      iphonepage
      OrderURL
      op
      checksum
      merchantnumber
      paymenttype
      paytitle
      paymemo
      returnvalue
      nexturl
      hash
      bankid
    }
  }
`;

@enhancer
export default class Actions extends React.PureComponent {
  formRef = React.createRef();

  static propTypes = {
    node: PropTypes.shape({}).isRequired,
    orderApplyList: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
      .isRequired,
  };

  state = {
    formData: null,
  };

  componentDidUpdate() {
    const { formData } = this.state;

    if (formData) this.formRef.current.submit();
  }

  payAgaion = (
    cache,
    {
      data: {
        paymentAgainOrderList: [{ formData }],
      },
    },
  ) => {
    const { transformLocale } = this.props;

    if (!formData || !formData.url) {
      message.error(transformLocale(LOCALE.PAY_FAILED));
      this.setState({ formData: null });
    } else {
      message.success(transformLocale(LOCALE.PAY_SUCCESS));
      this.setState({ formData });
    }
  };

  getOtherActions = () => {
    const {
      /** context */
      transformLocale,
      hasStoreAppPlugin,

      /** props */
      node: {
        id,
        status,
        paymentInfo: {
          list: [{ accountInfo, template }],
          paymentId,
          ...paymentInfo
        },
        shipmentInfo,
        products,
      },
      orderApplyList,
    } = this.props;

    if (![0, 3].includes(status)) return null;

    const { choosePayment } = accountInfo?.[template] || {};

    // 判斷是否可以稍後付款
    const payLater = choosePayment
      ? PAYMENT_CAN_PAID_LATER[template][choosePayment]
      : PAYMENT_CAN_PAID_LATER[template];

    // 判斷是否已有申請退換貨
    const orderApply = orderApplyList.filter(({ orderId }) => orderId === id);

    // 判斷是否有商品可以退換貨
    // TODO: should add in schemas
    const canOrderApply = products.reduce(
      (result, { id: productId, quantity, type }) => {
        if (type === 'gift') return result;

        const orderApplyProducts = orderApply.find(
          ({ orderProductId }) => orderProductId === productId,
        );

        if (orderApplyProducts && [0, 3].includes(orderApplyProducts.status))
          return result;

        return result || quantity - (orderApplyProducts?.quantity || 0) > 0;
      },
      false,
    );

    return (
      <>
        {!(payLater && paymentInfo.status === 0) ? null : (
          <Mutation
            mutation={gql`
              mutation paymentAgainOrderList(
                $paymentAgainOrderList: [PaymentAgainOrder]
              ) {
                paymentAgainOrderList(
                  paymentAgainOrderList: $paymentAgainOrderList
                ) {
                  id
                  formData {
                    ...outformDataObjectFragment
                  }
                  error: _error
                }
              }
              ${outformDataObjectFragment}
            `}
            update={this.payAgaion}
          >
            {payAgaion => (
              <div
                className={styles.root}
                onClick={() =>
                  payAgaion({
                    variables: {
                      paymentAgainOrderList: {
                        orderId: id,
                        paymentId,
                      },
                    },
                  })
                }
              >
                {transformLocale(LOCALE.ONPAY)}
              </div>
            )}
          </Mutation>
        )}

        {shipmentInfo.status !== 3 ? null : (
          <>
            {orderApply.length === 0 ? null : (
              <Link className={styles.root} href={`/orderApplyList/${id}`}>
                {transformLocale(LOCALE.APPLY_INFO)}
              </Link>
            )}

            {!canOrderApply ? (
              false
            ) : (
              <>
                {!hasStoreAppPlugin('returnOrder') ? null : (
                  <Link className={styles.root} href={`/orderRefund/${id}`}>
                    {transformLocale(LOCALE.ORDER_RETURN)}
                  </Link>
                )}

                {!hasStoreAppPlugin('replacement') ? null : (
                  <Link className={styles.root} href={`/orderExchange/${id}`}>
                    {transformLocale(LOCALE.ORDER_REPLACE)}
                  </Link>
                )}
              </>
            )}
          </>
        )}

        {!(paymentInfo.status !== 2 && template === 'custom') ? null : (
          <Link className={styles.root} href={`/payNotify/${id}`}>
            {transformLocale(LOCALE.PAY_NOTI)}
          </Link>
        )}
      </>
    );
  };

  render() {
    const {
      /** context */
      transformLocale,

      /** props */
      node: { id },
    } = this.props;
    const { formData } = this.state;
    const { url, params } = formData || {};

    return (
      <>
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

        {this.getOtherActions()}

        <Link className={styles.root} href={`/order/${id}#qa`}>
          {transformLocale(LOCALE.SERVICE)}
        </Link>
      </>
    );
  }
}
