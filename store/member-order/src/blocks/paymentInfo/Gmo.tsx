// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@store/utils/lib/i18n';

import Credit from './Credit';

// graphql typescript
import { gmoFragment as gmoFragmentType } from './__generated__/gmoFragment';
import { paymentInfoFragment_paymentInfo_list_accountInfo_gmo as paymentInfoFragmentPaymentInfoListAccountInfoGmo } from './__generated__/paymentInfoFragment';

// graphql import
import { creditFragment } from './Credit';

// typescript definition
interface PropsType {
  choosePayment: paymentInfoFragmentPaymentInfoListAccountInfoGmo['choosePayment'];
  paymentInfo: gmoFragmentType;
}

// definition
export const gmoFragment = gql`
  fragment gmoFragment on paymentInfoType {
    ...creditFragment
    id
    list {
      id
      accountInfo {
        gmo {
          gmoContractCode: contractCode
        }
      }
    }
  }

  ${creditFragment}
`;

export default React.memo(({ choosePayment, paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');
  const gmoContractCode =
    paymentInfo?.list?.[0]?.accountInfo?.gmo?.gmoContractCode;

  if (!choosePayment || !gmoContractCode) return null;

  return (
    <div>
      {t('blocks.payment.gmo-store-code')}

      {gmoContractCode}

      {choosePayment !== 'Credit' ? null : (
        <Credit paymentInfo={filter(creditFragment, paymentInfo)} />
      )}
    </div>
  );
});
