// import
import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { numberInfoFragment as numberInfoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  orderInvoice: numberInfoFragmentType;
}

// definition
export default React.memo(
  ({ orderInvoice: { status, code, issuedAt } }: PropsType) => {
    const { t } = useTranslation('member-order');
    const date = useMemo(() => {
      if (status === 'INVALID') return t('blocks.invoice.invalid');

      if (!issuedAt) return t('blocks.invoice.waiting');

      return format(new Date(issuedAt), 'yyyy/MM/dd HH:mm:ss');
    }, [t, status, issuedAt]);

    return (
      <>
        <div>
          {t('blocks.invoice.number')}

          {status === 'INVALID'
            ? t('blocks.invoice.invalid')
            : code || t('blocks.invoice.waiting')}
        </div>

        <div>
          {t('blocks.invoice.date')}

          {date}
        </div>
      </>
    );
  },
);
