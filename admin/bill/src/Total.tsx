// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

import { formatMoney } from './utils/format';
import styles from './styles/total.less';

// graphql typescript
import { totalFragment } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  bill: totalFragment;
}

// definition
export default React.memo(({ bill }: PropsType) => {
  const { t } = useTranslation('bill');

  return bill.currency === 'TWD' ? (
    <div className={styles.twd}>
      <div className={styles.rate}>
        <div>
          <div>{t('total.usd-rate')}</div>
          <div>{bill.fxRate}</div>
        </div>

        <div>{t('total.rate-description')}</div>
      </div>

      <div className={styles.fee}>
        <div>
          <div>{t('total.fee')}</div>
          <div>{`USD ${formatMoney(bill.totalFee)}`}</div>
        </div>

        <div>
          <div>{t('total.locale-fee')}</div>
          <div>{`TWD ${formatMoney(bill.localTotalFee, true)}`}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.usd}>
      <div>{t('total.locale-fee')}</div>
      <div>{`USD ${formatMoney(bill.totalFee)}`}</div>
    </div>
  );
});
