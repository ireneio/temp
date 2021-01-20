// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Progress, Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Link, { useRouter } from '@meepshop/link';

import Info from './info';
import useClipboard from './hooks/useClipboard';
import useAdTrack from './hooks/useAdTrack';
import styles from './styles/index.less';

// graphql typescript
import { getOrderInThankYouPage } from '@meepshop/types/gqls/store';

// graphql import
import { infoFragment } from './info';
import { useAdTrackFragment } from './hooks/useAdTrack';

// definition
const query = gql`
  query getOrderInThankYouPage($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        ...infoFragment
        ...useAdTrackFragment
      }
    }
  }

  ${infoFragment}
  ${useAdTrackFragment}
`;

export default React.memo(() => {
  const { t } = useTranslation('thank-you-page');
  const router = useRouter();
  const { loading, data } = useQuery<getOrderInThankYouPage>(query, {
    variables: { orderId: router.query.orderId },
  });
  const order = data?.viewer?.order || null;

  useClipboard(loading, order?.id || null);
  useAdTrack(filter(useAdTrackFragment, order));

  if (loading) return <Spin indicator={<Icon type="loading" spin />} />;

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
