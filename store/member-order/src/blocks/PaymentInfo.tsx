// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

import { Blocks } from './index';
import { AllpayType, EzpayType } from './constants';

// import
import React from 'react';
import gql from 'graphql-tag';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import idx from 'idx';

import { withTranslation } from '@store/utils/lib/i18n';

import { PAYMENT_SHOW_MEMO } from './constants';

// graphql typescript
import { paymentInfoFragment as paymentInfoFragmentType } from './__generated__/paymentInfoFragment';

// typescript definition
interface PropsType extends I18nPropsType {
  order: paymentInfoFragmentType;
  children: Blocks['renderDescription'];
}

// definition
export const paymentInfoFragment = gql`
  fragment paymentInfoFragment on Order {
    paidMessage {
      note
    }
    paymentInfo {
      list {
        id
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
          cathay {
            choosePayment: type
          }
          chinatrust {
            choosePayment: type
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

class PaymentInfo extends React.PureComponent<PropsType> {
  private paymentDescription = memoizeOne((t: PropsType['t']) => {
    const {
      order: { paymentInfo },
    } = this.props;
    const template = idx(paymentInfo, _ => _.list[0].template) as
      | 'allpay'
      | 'ezpay'
      | 'gmo'
      | 'cathay'
      | 'chinatrust'
      | 'hitrust'
      | undefined
      | null;

    if (!template) return null;

    // TODO: "hitrust" should list in "accountInfo"
    if (template === 'hitrust') return this.credit();

    const choosePayment = idx(
      paymentInfo,
      _ => _.list[0].accountInfo[template].choosePayment,
    );

    if (!choosePayment) return null;

    switch (template) {
      case 'allpay':
      case 'ezpay':
        if (
          !PAYMENT_SHOW_MEMO[template][
            choosePayment as keyof (AllpayType | EzpayType)
          ]
        )
          return null;

        if (choosePayment === 'Credit') return this.credit();

        return this[template](choosePayment as keyof (AllpayType | EzpayType));

      case 'gmo': {
        const gmoContractCode = idx(
          paymentInfo,
          _ => _.list[0].accountInfo[template].gmoContractCode,
        );

        if (!gmoContractCode) return null;

        return (
          <div>
            {t('blocks.payment.gmo-store-code')}
            {gmoContractCode}

            {choosePayment !== 'Credit' ? null : this.credit()}
          </div>
        );
      }

      case 'cathay':
      case 'chinatrust':
        return choosePayment !== 'CREDIT' ? null : this.credit();

      default:
        return null;
    }
  });

  private paidDescription = memoizeOne(
    (paidMessage: paymentInfoFragmentType['paidMessage']) => {
      if (!paidMessage || paidMessage.length === 0) return null;

      const latestMessage = paidMessage[paidMessage.length - 1];

      if (!latestMessage || !latestMessage.note) return null;

      return latestMessage.note.split('\n').map(i => <div key={i}>{i}</div>);
    },
  );

  private allpay = (choosePayment: keyof AllpayType): React.ReactNode => {
    const {
      /** context */
      t,

      /** props */
      order: { paymentInfo },
    } = this.props;
    const memo = idx(paymentInfo, _ => _.list[0].memo) || [];

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
              {t('blocks.payment.bank-code')}
              {BankCode}
            </div>

            <div>
              {t('blocks.payment.virtual-account')}
              {vAccount}
            </div>

            <div>
              {t('blocks.payment.expire-date')}
              {ExpireDate}
            </div>
          </>
        );

      case 'CVS':
        return (
          <>
            <div>
              {t('blocks.payment.cvs-payment-no')}
              {PaymentNo}
            </div>

            <div>
              {t('blocks.payment.expire-date')}
              {ExpireDate}
            </div>
          </>
        );

      case 'BARCODE':
        return (
          <>
            <div>
              {t('blocks.payment.barcode')}
              {Barcode1} {Barcode2} {Barcode3}
            </div>

            <div>
              {t('blocks.payment.expire-date')}
              {ExpireDate}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  private ezpay = (choosePayment: keyof EzpayType): React.ReactNode => {
    const {
      /** context */
      t,

      /** props */
      order: { paymentInfo },
    } = this.props;
    const memo = idx(paymentInfo, _ => _.list[0].memo) || [];

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
              {t('blocks.payment.cvs-payment-no')}
              {paycode}
            </div>

            <div>
              {t('blocks.payment.expire-date')}
              {moment.unix(expireDate).format('YYYY/M/D')}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  private credit = (): React.ReactNode => {
    const {
      /** context */
      t,

      /** props */
      order: { paymentInfo },
    } = this.props;
    const card4no = idx(paymentInfo, _ => _.list[0].card4no) || '';

    return <div>{`${t('blocks.payment.card-no')}${card4no}`}</div>;
  };

  public render(): React.ReactNode {
    const {
      children,
      t,
      order: { paidMessage, paymentInfo },
    } = this.props;
    const description = idx(paymentInfo, _ => _.list[0].description) || '';

    return children([
      this.paymentDescription(t),
      this.paidDescription(paidMessage),
      !description ? null : <pre>{description}</pre>,
    ]);
  }
}

export default withTranslation('member-order')(PaymentInfo);
