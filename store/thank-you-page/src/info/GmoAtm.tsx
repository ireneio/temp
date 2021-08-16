// import
import React, { useContext } from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
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
            value: format(new Date(atm.expireDate), 'yyyy/MM/dd HH:mm:ss'),
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
