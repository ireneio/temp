// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import Credit from './Credit';

// graphql typescript
import {
  allpayFragment as allpayFragmentType,
  paymentInfoFragment_paymentInfo_list_accountInfo_allpay as paymentInfoFragmentPaymentInfoListAccountInfoAllpay,
} from '@meepshop/types/gqls/store';

// graphql import
import { creditFragment } from './gqls/credit';

// typescript definition
interface PropsType {
  choosePayment: paymentInfoFragmentPaymentInfoListAccountInfoAllpay['choosePayment'];
  paymentInfo: allpayFragmentType;
}

// definition
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
        <div>
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
        </div>
      );

    case 'CVS':
      return (
        <div>
          <div>
            {t('blocks.payment.cvs.pay-code')}
            {PaymentNo}
          </div>

          <div>
            {t('blocks.payment.expire-date')}
            {ExpireDate}
          </div>
        </div>
      );

    case 'BARCODE':
      return (
        <div>
          <div>
            {t('blocks.payment.barcode')}
            {Barcode1} {Barcode2} {Barcode3}
          </div>

          <div>
            {t('blocks.payment.expire-date')}
            {ExpireDate}
          </div>
        </div>
      );

    default:
      return null;
  }
});
