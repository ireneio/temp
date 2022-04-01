// import
import React from 'react';
import { format, fromUnixTime } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

import Credit from './Credit';

// graphql typescript
import {
  ezpayFragment as ezpayFragmentType,
  paymentInfoFragment_paymentInfo_list_accountInfo_ezpay as paymentInfoFragmentPaymentInfoListAccountInfoEzpay,
} from '@meepshop/types/gqls/store';

// graphql import
import { creditFragment } from './gqls/credit';

// typescript definition
interface PropsType {
  choosePayment: paymentInfoFragmentPaymentInfoListAccountInfoEzpay['choosePayment'];
  paymentInfo: ezpayFragmentType;
}

// definition
export default React.memo(({ choosePayment, paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');

  switch (choosePayment) {
    case 'Credit':
      return <Credit paymentInfo={filter(creditFragment, paymentInfo)} />;

    case 'MMK': {
      // SHOULD_NOT_BE_NULL
      const { paycode, expireDate } =
        paymentInfo.list?.[0]?.memo?.[0]?.ezpay || {};

      return (
        <div>
          <div>
            {t('blocks.payment.cvs.pay-code')}
            {paycode}
          </div>

          <div>
            {t('blocks.payment.expire-date')}
            {format(
              fromUnixTime(expireDate || 0 /** SHOULD_NOT_BE_NULL */),
              'yyyy/M/d',
            )}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
});
