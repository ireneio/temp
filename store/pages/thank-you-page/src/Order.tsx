// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';

import OrderNotFound from './OrderNotFound';
import PaymentFail from './PaymentFail';
import useAdTrack from './hooks/useAdTrack';
import useInfo from './hooks/useInfo';
import styles from './styles/order.less';

// graphql typescript
import { getOrderInThankYouPage as getOrderInThankYouPageType } from '@meepshop/types/gqls/store';

// graphql import
import { getOrderInThankYouPage } from './gqls';
import { useAdTrackFragment } from './gqls/useAdTrack';

// definition
export default React.memo(() => {
  const { t } = useTranslation('thank-you-page');
  const router = useRouter();
  const { loading, data } = useQuery<getOrderInThankYouPageType>(
    getOrderInThankYouPage,
    {
      variables: { orderId: router.query.orderId },
    },
  );
  const info = useInfo(data?.viewer || null);

  const order = data?.viewer?.order || null;
  const template = order?.paymentInfo?.list?.[0]?.template;
  const status = order?.paymentInfo?.status;

  useAdTrack(filter(useAdTrackFragment, order));

  if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

  if (!order) return <OrderNotFound />;

  if (template === 'ecpay2' && status === 4) return <PaymentFail />;

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <CheckCircleOutlined />
          {t('title.default')}
        </div>

        {!info ? (
          <div className={styles.description}>{t('info.default')}</div>
        ) : (
          info
        )}

        <div className={styles.button}>
          <Link href="/">
            <Button>{t('return')}</Button>
          </Link>

          <Link href={`/order/${order.id}`}>
            <Button>{t('order')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
});
