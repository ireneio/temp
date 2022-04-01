// import
import React from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

import Credit from './Credit';

// graphql typescript
import {
  ecpayFragment as ecpayFragmentType,
  paymentInfoFragment_paymentInfo_list_accountInfo_ecpay2 as paymentInfoFragmentPaymentInfoListAccountInfoEcpay2,
} from '@meepshop/types/gqls/store';

// graphql import
import { creditFragment } from './gqls/credit';

// typescript definition
interface PropsType {
  choosePayment:
    | paymentInfoFragmentPaymentInfoListAccountInfoEcpay2['choosePayment']
    | string;
  paymentInfo: ecpayFragmentType;
}

// definition
export default React.memo(({ choosePayment, paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');

  const { bankCode, account, expireDate: atmExpireDate } =
    paymentInfo.list?.[0]?.atm || {};
  const { payCode, expireDate: cvsExpireDate } =
    paymentInfo.list?.[0]?.cvsPayCode || {};
  const { barcode1, barcode2, barcode3, expireDate: barcodeExpireDate } =
    paymentInfo.list?.[0]?.barcode || {};

  switch (choosePayment) {
    case 'CREDIT':
    case 'CREDIT_INSTALLMENT':
      return <Credit paymentInfo={filter(creditFragment, paymentInfo)} />;

    case 'ATM':
      return (
        <div>
          <div>
            {t('blocks.payment.bank-code')}
            {bankCode}
          </div>

          <div>
            {t('blocks.payment.virtual-account')}
            {account}
          </div>

          <div>
            {t('blocks.payment.expire-date')}
            {atmExpireDate
              ? format(new Date(atmExpireDate), 'yyyy/MM/dd HH:mm:ss')
              : ''}
          </div>
        </div>
      );

    case 'CVS':
      return (
        <div>
          <div>
            {t('blocks.payment.cvs.pay-code')}
            {payCode}
          </div>

          <div>
            {t('blocks.payment.expire-date')}
            {cvsExpireDate
              ? format(new Date(cvsExpireDate), 'yyyy/MM/dd HH:mm:ss')
              : ''}
          </div>
        </div>
      );

    case 'BARCODE':
      return (
        <div>
          <div>
            {t('blocks.payment.barcode')}
            {barcode1} {barcode2} {barcode3}
          </div>

          <div>
            {t('blocks.payment.expire-date')}
            {barcodeExpireDate
              ? format(new Date(barcodeExpireDate), 'yyyy/MM/dd HH:mm:ss')
              : ''}
          </div>
        </div>
      );

    default:
      return null;
  }
});
