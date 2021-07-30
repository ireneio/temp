// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Progress, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';

import Info from './info';
import useClipboard from './hooks/useClipboard';
import useAdTrack from './hooks/useAdTrack';
import styles from './styles/order.less';

// graphql typescript
import { getOrderInThankYouPage as getOrderInThankYouPageType } from '@meepshop/types/gqls/store';

// graphql import
import { getOrderInThankYouPage } from './gqls';
import { useAdTrackFragment } from './gqls/useAdTrack';
import { infoFragment } from './info/gqls';

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
  const order = data?.viewer?.order || null;

  useClipboard(loading, order?.id || null);
  useAdTrack(filter(useAdTrackFragment, order));

  if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <div className={styles.root}>
      <div>
        <Progress
          type="circle"
          percent={100}
          width={72}
          {...(!order ? { status: 'exception', format: () => '!' } : {})}
        />

        <h1>{!order ? t('title.error') : t('title.default')}</h1>

        <Info order={filter(infoFragment, order)} />

        <div className={styles.buttonRoot}>
          <Link href={!order ? '/orders' : '/'}>
            <Button>{!order ? t('order') : t('return')}</Button>
          </Link>

          {!order ? (
            // eslint-disable-next-line jsx-a11y/aria-role
            <Button role="copy">{t('copy')}</Button>
          ) : (
            <Link href={`/order/${order.id}`}>
              <Button>{t('order')}</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});