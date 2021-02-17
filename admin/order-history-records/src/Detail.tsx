// import
import React, { useContext } from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Currency as CurrencyContext } from '@meepshop/context';

import styles from './styles/detail.less';

// graphql typescript
import { detailFragment } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  orderHistoryRecord: detailFragment;
}

// definition
export default React.memo(({ orderHistoryRecord }: PropsType) => {
  const {
    orderProductQuantityDelta,
    productsAmountDelta,
    adjustAmountDelta,
    totalAmountDelta,
  } = orderHistoryRecord;
  const { t } = useTranslation('order-history-records');
  const { c } = useContext(CurrencyContext);

  return (
    <div className={styles.root}>
      {orderProductQuantityDelta.length === 0 ? null : (
        <div>
          <div>{t('detail.orderProductQuantityDelta')}</div>

          <div className={styles.orderProductQuantityDelta}>
            {orderProductQuantityDelta.map(
              ({ sku, name, specs, beforeQuantity, afterQuantity }) => (
                <div key={`${sku}${name}${specs?.join('-')}`}>
                  <div>
                    {!sku ? null : <div className={styles.sku}>{sku}</div>}

                    <div>{name}</div>

                    {(specs || []).length === 0 ? null : (
                      <div className={styles.specs}>{specs?.join(' / ')}</div>
                    )}
                  </div>

                  <div>
                    <span className={styles.before}>{beforeQuantity}</span>

                    {' ＞ '}
                    {afterQuantity}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {!productsAmountDelta ? null : (
        <div>
          <div>{t('detail.productsAmountDelta')}</div>

          <div>
            <span className={styles.before}>
              {c(productsAmountDelta.before)}
            </span>

            {' ＞ '}
            {c(productsAmountDelta.after)}
          </div>
        </div>
      )}

      {!adjustAmountDelta ? null : (
        <div>
          <div>{t('detail.adjustAmountDelta')}</div>

          <div>
            <span className={styles.before}>{c(adjustAmountDelta.before)}</span>

            {' ＞ '}
            {c(adjustAmountDelta.after)}
          </div>
        </div>
      )}

      <div className={styles.border} />

      <div className={styles.totalAmountDelta}>
        <div>{t('detail.totalAmountDelta')}</div>

        <div>
          <span className={styles.before}>{c(totalAmountDelta.before)}</span>

          {' ＞ '}

          <span className={styles.after}>{c(totalAmountDelta.after)}</span>
        </div>
      </div>
    </div>
  );
});
