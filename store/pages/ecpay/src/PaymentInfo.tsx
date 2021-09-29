// import
import React, { useContext } from 'react';
import { Divider, Button } from 'antd';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import { Currency as CurrencyContext } from '@meepshop/context';
import { PaymentInfoIcon } from '@meepshop/icons';

import styles from './styles/paymentInfo.less';

// graphql typescript
import { paymentFragment as paymentFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  viewer: paymentFragmentType;
  type: 'atm' | 'cvs' | 'barcode';
  expireDate: string | null;
  children: React.ReactNode;
}

// definition
export default React.memo(
  ({ viewer, type, expireDate, children }: PropsType) => {
    const { t } = useTranslation('ecpay');
    const { c } = useContext(CurrencyContext);

    const storeName = viewer.store?.description?.name || null;
    const orderId = viewer.order?.id;
    const orderNo = viewer.order?.orderNo || null;
    const amount = viewer.order?.priceInfo?.total || 0;

    return (
      <div className={styles.root}>
        <div>
          <div className={styles.title}>
            <PaymentInfoIcon />
            {t('info.title')}
          </div>

          {[
            { text: t('info.order-number'), value: orderNo },
            { text: t('info.store-name'), value: storeName },
          ].map(({ text, value }) => (
            <div className={styles.item}>
              <div>{text}</div>
              <div>{value}</div>
            </div>
          ))}

          <Divider />

          {[
            { text: t('info.payment-method'), value: t(`${type}.title`) },
            {
              text: t('info.expire-date'),
              value: expireDate
                ? format(new Date(expireDate), 'yyyy/MM/dd HH:mm:ss')
                : null,
            },
            { text: t('info.amount'), value: c(amount) },
          ].map(({ text, value }, index) => (
            <div className={styles.item} key={text}>
              <div>{text}</div>
              <div className={`${styles.value} ${!index ? '' : styles.bold}`}>
                {value}
              </div>
            </div>
          ))}

          <div className={styles.children}>{children}</div>
        </div>

        <div className={styles.hints}>{t('info.hints')}</div>

        <Link href={`/checkout/thank-you-page/${orderId}`}>
          <Button>{t('info.button')}</Button>
        </Link>
      </div>
    );
  },
);
