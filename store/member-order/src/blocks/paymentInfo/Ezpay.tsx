// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import Credit from './Credit';

// graphql typescript
import { ezpayFragment as ezpayFragmentType } from './__generated__/ezpayFragment';
import { paymentInfoFragment_paymentInfo_list_accountInfo_ezpay as paymentInfoFragmentPaymentInfoListAccountInfoEzpay } from './__generated__/paymentInfoFragment';

// graphql import
import { creditFragment } from './Credit';

// typescript definition
interface PropsType {
  choosePayment: paymentInfoFragmentPaymentInfoListAccountInfoEzpay['choosePayment'];
  paymentInfo: ezpayFragmentType;
}

// definition
export const ezpayFragment = gql`
  fragment ezpayFragment on paymentInfoType {
    ...creditFragment
    id
    list {
      id
      memo {
        ezpay {
          paycode
          expireDate
        }
      }
    }
  }

  ${creditFragment}
`;

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
            {moment
              .unix(expireDate || 0 /** SHOULD_NOT_BE_NULL */)
              .format('YYYY/M/D')}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
});
