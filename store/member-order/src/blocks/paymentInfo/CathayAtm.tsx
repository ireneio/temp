// import
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { currency as currencyContext } from '@meepshop/context';

// graphql typescript
import { cathayAtmOrderFragment as cathayAtmOrderFragmentType } from './__generated__/cathayAtmOrderFragment';

// typescript definition
interface PropsType {
  order: cathayAtmOrderFragmentType;
}

// definition
export const cathayAtmOrderFragment = gql`
  fragment cathayAtmOrderFragment on Order {
    id

    priceInfo {
      total
    }

    paymentInfo {
      id
      list {
        id
        atm {
          bankName
          bankCode
          account
          expireDate
        }
      }
    }
  }
`;

export default React.memo(({ order }: PropsType) => {
  const { t } = useTranslation('member-order');
  const { c } = useContext(currencyContext);
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
