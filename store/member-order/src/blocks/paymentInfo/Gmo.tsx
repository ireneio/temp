// import
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Currency as CurrencyContext } from '@meepshop/context';

import Credit from './Credit';

// graphql typescript
import { gmoOrderFragment as gmoOrderFragmentType } from './__generated__/gmoOrderFragment';
import { paymentInfoFragment_paymentInfo_list_accountInfo_gmo as paymentInfoFragmentPaymentInfoListAccountInfoGmo } from './__generated__/paymentInfoFragment';

// graphql import
import { creditFragment } from './Credit';

// typescript definition
interface PropsType {
  choosePayment: paymentInfoFragmentPaymentInfoListAccountInfoGmo['choosePayment'];
  order: gmoOrderFragmentType;
}

// definition
export const gmoOrderFragment = gql`
  fragment gmoOrderFragment on Order {
    id
    paymentInfo {
      ...creditFragment
      id
      list {
        id
        atm {
          bankCode
          account
          expireDate
        }
        cvsPayCode {
          payCode
          expireDate
        }
      }
    }

    priceInfo {
      total
    }
  }

  ${creditFragment}
`;

export default React.memo(({ choosePayment, order }: PropsType) => {
  const { t } = useTranslation('member-order');
  const { c } = useContext(CurrencyContext);

  const paymentInfo = order?.paymentInfo;

  if (!choosePayment || !paymentInfo) return null;

  switch (choosePayment) {
    case 'Credit':
      return <Credit paymentInfo={filter(creditFragment, paymentInfo)} />;

    case 'ATM': {
      const atm = order?.paymentInfo?.list?.[0]?.atm;

      if (!atm) return null;

      return (
        <div>
          {[
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
    }

    case 'KIOSK': {
      const cvsPayCode = order?.paymentInfo?.list?.[0]?.cvsPayCode;

      if (!cvsPayCode) return null;

      return (
        <div>
          {[
            {
              key: 'pay-code',
              value: cvsPayCode.payCode,
            },
            {
              key: 'price',
              value: c(order?.priceInfo?.total || 0),
            },
            {
              key: 'expire-date',
              value: moment(cvsPayCode.expireDate).format(
                'YYYY/MM/DD HH:mm:ss',
              ),
            },
          ].map(({ key, value }) => (
            <div key={key}>
              {t(`blocks.payment.cvs.${key}`)}

              {value}
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
});
