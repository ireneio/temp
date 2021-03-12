// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { creditFragment as creditFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  paymentInfo: creditFragmentType;
}

// definition
export default React.memo(({ paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');
  const card4no = paymentInfo?.list?.[0]?.card4no;

  if (!card4no) return null;

  return (
    <div>
      {t('blocks.payment.card-no')}

      {card4no}
    </div>
  );
});
