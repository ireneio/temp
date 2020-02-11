// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@store/utils/lib/i18n';

import Credit from './Credit';

// graphql typescript
import { allpayFragment as allpayFragmentType } from './__generated__/allpayFragment';
import { paymentInfoFragment_paymentInfo_list_accountInfo_allpay as paymentInfoFragmentPaymentInfoListAccountInfoAllpay } from './__generated__/paymentInfoFragment';

// graphql import
import { creditFragment } from './Credit';

// typescript definition
interface PropsType {
  choosePayment: paymentInfoFragmentPaymentInfoListAccountInfoAllpay['choosePayment'];
  paymentInfo: allpayFragmentType;
}

// definition
export const allpayFragment = gql`
  fragment allpayFragment on paymentInfoType {
    ...creditFragment
    id
    list {
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
      }
    }
  }

  ${creditFragment}
`;

export default React.memo(({ choosePayment, paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');
  const {
    BankCode,
    vAccount,
    PaymentNo,
    Barcode1,
    Barcode2,
    Barcode3,
    ExpireDate,
  } = paymentInfo.list?.[0]?.memo?.[0]?.allpay || {};

  switch (choosePayment) {
    case 'Credit':
      return <Credit paymentInfo={filter(creditFragment, paymentInfo)} />;

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
});
