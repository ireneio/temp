// import
import React, { useContext } from 'react';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/ecpayCredit.less';

// graphql typescript
import { ecpayCreditFragment as ecpayCreditFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  viewer: ecpayCreditFragmentType;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('thank-you-page');

  if (!viewer) return null;

  const storeName = viewer.store?.description?.name || null;
  const orderNo = viewer.order?.orderNo || null;
  const price = viewer.order?.priceInfo?.total || 0;
  const choosePayment =
    viewer.order?.paymentInfo?.list?.[0]?.accountInfo?.ecpay2?.ChoosePayment;
  const status = viewer.order?.paymentInfo?.status;

  return (
    <>
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
                value: t(`credit.${choosePayment}`),
              },
              {
                key: 'price',
                value: c(price),
              },
              {
                key: 'payment-status',
                value:
                  status === 2 ? t('credit.completed') : t('credit.waiting'),
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} > p {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.block} {
              background-color: ${colors[1]};
              box-shadow: 0 2px 15px 0 ${transformColor(colors[3]).alpha(0.15)};
            }

            .${styles.row} > div:first-child {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }
          `,
        }}
      />
    </>
  );
});
