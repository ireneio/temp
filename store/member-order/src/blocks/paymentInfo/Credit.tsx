// import
import React from 'react';
import gql from 'graphql-tag';

import { useTranslation } from '@store/utils/lib/i18n';

// graphql typescript
import { creditFragment as creditFragmentType } from './__generated__/creditFragment';

// typescript definition
interface PropsType {
  paymentInfo: creditFragmentType;
}

// definition
export const creditFragment = gql`
  fragment creditFragment on paymentInfoType {
    id
    list {
      id
      card4no
    }
  }
`;

export default React.memo(({ paymentInfo }: PropsType) => {
  const { t } = useTranslation('member-order');

  return (
    <div>
      {t('blocks.payment.card-no')}

      {paymentInfo?.list?.[0]?.card4no || ''}
    </div>
  );
});
