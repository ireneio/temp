// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';
import CheckoutSteps from '@store/checkout-steps';

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
  const colors = useContext(ColorsContext);
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

  if (['gmo', 'ecpay2'].includes(template || '') && status === 4)
    return <PaymentFail />;

  return (
    <>
      <div className={styles.root}>
        <CheckoutSteps step="complete" />

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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${colors[0]};
              color: ${colors[3]};
            }

            .${styles.description} {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.button} .ant-btn:first-child {
              color: ${colors[0]};
              background-color: ${colors[3]};
              border-color: ${colors[3]};
            }

            .${styles.button} .ant-btn:last-child {
              color: ${colors[3]};
              background-color: ${colors[0]};
              border-color: ${colors[3]};
            }
          `,
        }}
      />
    </>
  );
});
