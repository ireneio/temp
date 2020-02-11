// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { useRouter } from 'next/router';
import { Spin, Icon, Progress, Button } from 'antd';

import { useTranslation } from '@store/utils/lib/i18n';
import getLinkProps from '@store/utils/lib/getLinkProps';

import Info from './info';
import useClipboard from './hooks/useClipboard';
import useAdTrack from './hooks/useAdTrack';
import styles from './styles/index.less';

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
  const { loading, data } = useQuery(query, {
    variables: { orderId: router.query.orderId },
  });
  const order = data?.viewer.order;

  useClipboard(t, loading, order?.id);
  useAdTrack(!order ? order : filter(useAdTrackFragment, order));

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

        <Info order={!order ? order : filter(infoFragment, order)} />

        <div className={styles.buttonRoot}>
          <Button
            onClick={() => {
              const linkProps = getLinkProps(!order ? '/orders' : '/');

              router.push(linkProps.href, linkProps.as);
            }}
          >
            {!order ? t('order') : t('return')}
          </Button>

          <Button
            {...(!order
              ? {
                  role: 'copy',
                }
              : {
                  onClick: () => {
                    const linkProps = getLinkProps(`/order/${order.id}`);

                    router.push(linkProps.href, linkProps.as);
                  },
                })}
          >
            {!order ? t('copy') : t('order')}
          </Button>
        </div>
      </div>
    </div>
  );
});
