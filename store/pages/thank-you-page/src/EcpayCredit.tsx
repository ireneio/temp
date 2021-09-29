// import
import React, { useContext } from 'react';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

import styles from './styles/ecpayCredit.less';

// graphql typescript
import { ecpayCreditFragment as ecpayCreditFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  viewer: ecpayCreditFragmentType;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('thank-you-page');
  const { c } = useContext(CurrencyContext);

  if (!viewer) return null;

  const storeName = viewer.store?.description?.name || null;
  const orderNo = viewer.order?.orderNo || null;
  const price = viewer.order?.priceInfo?.total || 0;

  return (
    <div className={styles.root}>
      <p>{t('info.credit')}</p>

      <div className={styles.block}>
        <div>
          {[
            {
              key: 'order-number',
              value: orderNo,
            },
            {
              key: 'store-name',
              value: storeName,
            },
            {
              key: 'payment-method',
              value: t('credit.credit-card'),
            },
            {
              key: 'price',
              value: c(price),
            },
          ].map(({ key, value }) => (
            <div key={key} className={styles.row}>
              <div>{t(`credit.${key}`)}</div>

              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
