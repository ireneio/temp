// import
import React from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { transactionNoFragment as transactionNoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  paymentInfo: transactionNoFragmentType;
}

// definition
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
