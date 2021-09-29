// import
import React, { useContext } from 'react';
import { Divider } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import { OrderOutlineIcon } from '@meepshop/icons';

import styles from './styles/orderInfo.less';

// graphql typescript
import { orderInfoFragment as orderInfoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  viewer: orderInfoFragmentType;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('ecpay');
  const { c } = useContext(CurrencyContext);

  const storeName = viewer.store?.description?.name || null;
  const orderNo = viewer.order?.orderNo || null;
  const amount = viewer.order?.priceInfo?.total || 0;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <OrderOutlineIcon />
        {t('order.title')}
      </div>

      {[
        { text: t('order.order-number'), value: orderNo },
        { text: t('order.store-name'), value: storeName },
      ].map(({ text, value }) => (
        <div key={value} className={styles.info}>
          <div>{text}</div>
          <div>{value}</div>
        </div>
      ))}

      <Divider />

      <div className={styles.amount}>
        <div>{t('order.amount')}</div>
        <div>{c(amount)}</div>
      </div>
    </div>
  );
});
