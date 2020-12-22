// import
import React, { useContext } from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Currency as CurrencyContext } from '@meepshop/context';

import styles from './styles/detail.less';

// graphql typescript
import { detailFragment } from './gqls/__generated__/detailFragment';

// typescript definition
interface PropsType {
  orderHistoryRecord: detailFragment;
}

// definition
export default React.memo(({ orderHistoryRecord }: PropsType) => {
  const {
    productsChangeDelta,
    productsAmountDelta,
    adjustAmountDelta,
    orderTotalAmountDelta,
  } = orderHistoryRecord;
  const { t } = useTranslation('order-history-records');
  const { c } = useContext(CurrencyContext);

  return (
    <div className={styles.root}>
      {productsChangeDelta.length === 0 ? null : (
        <div>
          <div>{t('detail.productsChangeDelta')}</div>

          <div className={styles.productsChangeDelta}>
            {productsChangeDelta.map(
              ({ sku, name, spec, beforeQuantity, afterQuantity }) => (
                <div key={`${sku}${name}${spec}`}>
                  <div>
                    {!sku ? null : <div className={styles.sku}>{sku}</div>}

                    <div>{name}</div>

                    {!spec ? null : <div className={styles.spec}>{spec}</div>}
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

      <div className={styles.orderTotalAmountDelta}>
        <div>{t('detail.orderTotalAmountDelta')}</div>

        <div>
          <span className={styles.before}>
            {c(orderTotalAmountDelta.before)}
          </span>

          {' ＞ '}

          <span className={styles.after}>{c(orderTotalAmountDelta.after)}</span>
        </div>
      </div>
    </div>
  );
});
