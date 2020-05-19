// import
import React from 'react';
import gql from 'graphql-tag';

import { useTranslation } from '@store/utils/lib/i18n';

// graphql typescript
import { transactionNoFragment as transactionNoFragmentType } from './__generated__/transactionNoFragment';

// typescript definition
interface PropsType {
  paymentInfo: transactionNoFragmentType;
}

// definition
export const transactionNoFragment = gql`
  fragment transactionNoFragment on paymentInfoType {
    id
    list {
      id
      transactionNo
    }
  }
`;

export default React.memo(({ paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');
  const transactionNo = paymentInfo?.list?.[0]?.transactionNo;

  if (!transactionNo) return null;

  return (
    <div>
      {t('blocks.payment.transaction-no')}

      {transactionNo}
    </div>
  );
});
