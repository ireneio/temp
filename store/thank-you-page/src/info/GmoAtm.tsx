// import
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Currency as CurrencyContext } from '@meepshop/context';

import styles from './styles/gmoAtm.less';

// graphql typescript
import { gmoAtmFragment as gmoAtmFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: gmoAtmFragmentType;
  children: React.ReactElement;
}

// definition
export const gmoAtmFragment = gql`
  fragment gmoAtmFragment on Order {
    id
    paymentInfo {
      id
      list {
        id
        atm {
          bankCode
          account
          expireDate
        }
        accountInfo {
          gmo {
            paymentType
          }
        }
      }
    }

    priceInfo {
      total
    }
  }
`;

export default React.memo(({ order, children }: PropsType) => {
  const { t } = useTranslation('thank-you-page');
  const { c } = useContext(CurrencyContext);
  const atm = order?.paymentInfo?.list?.[0]?.atm;

  if (!atm) return children;

  return (
    <div className={styles.root}>
      <p>{t('info.atm')}</p>

      <div className={styles.block}>
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
          <div key={key} className={styles.row}>
            <div>{t(`atm.${key}`)}</div>

            <div>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
