import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import { areEqual } from 'fbjs';

import { contextProvider } from 'context';

import { PAYMENT_SHOW_MEMO } from './constants';
import * as LOCALE from './locale';

const { enhancer } = contextProvider('locale');

export const paymentInfoFragment = gql`
  fragment paymentInfoFragment on Order {
    paidMessage {
      note
    }
    paymentInfo {
      list {
        template
        description
        accountInfo {
          allpay {
            choosePayment: ChoosePayment
          }
          ezpay {
            choosePayment: ezpayPaymentType
          }
          gmo {
            gmoContractCode: contractCode
            choosePayment: paymentType
          }
        }
        memo {
          allpay {
            BankCode
            vAccount
            PaymentNo
            Barcode1
            Barcode2
            Barcode3
            ExpireDate
          }
          ezpay {
            paycode
            expireDate
          }
        }
        card4no
      }
    }
  }
`;

@enhancer
export default class PaymentInfo extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({}).isRequired,
    children: PropTypes.func.isRequired,
  };

  paymentDescription = memoizeOne(template => {
    const {
      /** context */
      transformLocale,

      /** props */
      order: {
        paymentInfo: {
          list: [{ accountInfo }],
        },
      },
    } = this.props;
    const { choosePayment, gmoContractCode } = accountInfo[template] || {};

    switch (template) {
      case 'allpay':
      case 'ezpay':
        if (!PAYMENT_SHOW_MEMO[template][choosePayment]) return null;

        if (choosePayment === 'Credit') return this.credit();

        return this[template](choosePayment);

      case 'gmo':
        if (!gmoContractCode) return null;

        return (
          <div>
            {transformLocale(LOCALE.GMO_STORE_CODE)}
            {gmoContractCode}

            {choosePayment !== 'Credit' ? null : this.credit()}
          </div>
        );

      case 'hitrust':
        return this.credit();

      default:
        return null;
    }
  });

  paidDescription = memoizeOne(paidMessage => {
    if (paidMessage.length === 0) return null;

    return paidMessage[paidMessage.length - 1].note
      .split('\n')
      .map(i => <div key={i}>{i}</div>);
  }, areEqual);

  allpay = choosePayment => {
    const {
      /** context */
      transformLocale,

      /** props */
      order: {
        paymentInfo: {
          list: [{ memo }],
        },
      },
    } = this.props;

    // FIXME: 等待後端修正移除
    if (!memo.length) return null;

    const [
      {
        allpay: {
          BankCode,
          vAccount,
          PaymentNo,
          Barcode1,
          Barcode2,
          Barcode3,
          ExpireDate,
        },
      },
    ] = memo;

    switch (choosePayment) {
      case 'ATM':
        return (
          <>
            <div>
              {transformLocale(LOCALE.BANK_CODE)}
              {BankCode}
            </div>

            <div>
              {transformLocale(LOCALE.VIRTUAL_ACCOUNT)}
              {vAccount}
            </div>

            <div>
              {transformLocale(LOCALE.EXPIRE_DATE)}
              {ExpireDate}
            </div>
          </>
        );

      case 'CVS':
        return (
          <>
            <div>
              {transformLocale(LOCALE.CVS_PAYMENT_NO)}
              {PaymentNo}
            </div>

            <div>
              {transformLocale(LOCALE.EXPIRE_DATE)}
              {ExpireDate}
            </div>
          </>
        );

      case 'BARCODE':
        return (
          <>
            <div>
              {transformLocale(LOCALE.BARCODE)}
              {Barcode1} {Barcode2} {Barcode3}
            </div>

            <div>
              {transformLocale(LOCALE.EXPIRE_DATE)}
              {ExpireDate}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  ezpay = choosePayment => {
    const {
      /** context */
      transformLocale,

      /** props */
      order: {
        paymentInfo: {
          list: [{ memo }],
        },
      },
    } = this.props;

    // FIXME: 等待後端修正移除
    if (!memo.length) return null;

    const [
      {
        ezpay: { paycode, expireDate },
      },
    ] = memo;

    switch (choosePayment) {
      case 'MMK':
        return (
          <>
            <div>
              {transformLocale(LOCALE.CVS_PAYMENT_NO)}
              {paycode}
            </div>

            <div>
              {transformLocale(LOCALE.EXPIRE_DATE)}
              {moment.unix(expireDate).format('YYYY/M/D')}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  credit = () => {
    const {
      /** context */
      transformLocale,

      /** props */
      order: {
        paymentInfo: {
          list: [{ card4no }],
        },
      },
    } = this.props;

    return <div>{`${transformLocale(LOCALE.CARD_NO)}${card4no}`}</div>;
  };

  render() {
    const {
      children,
      order: {
        paidMessage,
        paymentInfo: {
          list: [{ description, template }],
        },
      },
    } = this.props;

    return children([
      this.paymentDescription(template),
      this.paidDescription(paidMessage || []),
      description.split('\n').map(i => <div key={i}>{i}</div>),
    ]);
  }
}
