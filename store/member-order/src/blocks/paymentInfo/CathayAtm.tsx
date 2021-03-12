// import
import React, { useContext } from 'react';
import moment from 'moment';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { cathayAtmOrderFragment as cathayAtmOrderFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: cathayAtmOrderFragmentType;
}

// definition
export default React.memo(({ order }: PropsType) => {
  const { t } = useTranslation('member-order');
  const { c } = useContext(CurrencyContext);
  const atm = order?.paymentInfo?.list?.[0]?.atm;

  if (!atm) return null;

  return (
    <div>
      {[
        {
          key: 'bank-name',
          value: atm.bankName,
        },
        {
          key: 'back-code',
          value: atm.bankCode,
        },
        {
          key: 'account',
          value: atm.account,
        },
        {
          key: 'price',
          value: c(order?.priceInfo?.total || 0),
        },
        {
          key: 'expire-date',
          value: moment(atm.expireDate).format('YYYY/MM/DD HH:mm:ss'),
        },
      ].map(({ key, value }) => (
        <div key={key}>
          {t(`blocks.payment.atm.${key}`)}

          {value}
        </div>
      ))}
    </div>
  );
});
