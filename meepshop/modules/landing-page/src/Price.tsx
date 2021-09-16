// import
import React, { useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/price.less';

// graphql typescript
import { priceFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default React.memo(({ order }: { order: priceFragment | null }) => {
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('landing-page');

  if (!order?.activityInfo || !order.priceInfo) return null;

  const { activityInfo, priceInfo } = order;
  const { productPrice, paymentFee, shipmentFee, total } = priceInfo;

  return (
    <div className={styles.root}>
      <div>
        {!productPrice ? null : (
          <div className={styles.block}>
            <span>{t('price')}</span>

            <span className={styles.content}>{c(productPrice)}</span>
          </div>
        )}

        {activityInfo.map(activity =>
          !activity?.discountPrice ? null : (
            <div key={activity.id} className={styles.block}>
              <span>
                {['productCoupon', 'orderCoupon'].includes(
                  activity.plugin || '',
                )
                  ? t('coupon-code')
                  : activity.title?.zh_TW}
              </span>

              <span className={styles.content}>
                - {c(activity.discountPrice)}
              </span>
            </div>
          ),
        )}

        {!paymentFee ? null : (
          <div className={styles.block}>
            <span>{t('payment-fee')}</span>

            <span className={styles.content}>
              {paymentFee < 0 ? '-' : ''} {c(Math.abs(paymentFee))}
            </span>
          </div>
        )}

        {!shipmentFee ? null : (
          <div className={styles.block}>
            <span>{t('shipment-fee')}</span>

            <span className={styles.content}>{c(shipmentFee)}</span>
          </div>
        )}

        {!total ? null : (
          <div className={styles.block}>
            <span>{t('total')}</span>

            <span className={styles.content}>{c(total)}</span>
          </div>
        )}
      </div>
    </div>
  );
});
