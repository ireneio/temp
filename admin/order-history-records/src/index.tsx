// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, List } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { meepshopLogo } from '@meepshop/images';

import Record from './Record';
import styles from './styles/index.less';

// graphql typescript
import {
  getOrderHistoryRecords as getOrderHistoryRecordsType,
  getOrderHistoryRecordsVariables,
  getOrderHistoryRecords_viewer_order_orderHistoryRecords as getOrderHistoryRecordsViewerOrderOrderHistoryRecords,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getOrderHistoryRecords } from './gqls';
import { recordFragment } from './gqls/record';

// typescript definition
interface PropsType {
  orderId?: string;
  namespacesRequired: string[];
}

// definition
const OrderHistoryRecords: NextPage<PropsType> = React.memo(
  ({ orderId }: PropsType) => {
    const { t } = useTranslation('order-history-records');
    const { data } = useQuery<
      getOrderHistoryRecordsType,
      getOrderHistoryRecordsVariables
    >(getOrderHistoryRecords, {
      variables: {
        orderId: orderId as string,
      },
    });
    const [limit, setLimit] = useState(5);
    const [openedRecords, setOpenedRecords] = useState<number[]>([]);
    const order = data?.viewer?.order;

    if (!order) return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <div className={styles.root}>
        <h1>
          <img src={meepshopLogo} alt="logo" />

          {t('title')}
        </h1>

        <div className={styles.info}>
          <div>
            <div>{t('orderNo')}</div>

            <div>{order.orderNo}</div>
          </div>

          <div>
            <div>{t('createdAt')}</div>

            <div>{order.createdAt}</div>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.subTitle}>
            <h2>{t('sub-title')}</h2>

            {order.orderHistoryRecords.length === 0 ? null : (
              <div>
                <span
                  onClick={() =>
                    setOpenedRecords(
                      order.orderHistoryRecords
                        .slice(0, limit)
                        .map((_, index) => index),
                    )
                  }
                >
                  {t('all-items.open')}
                </span>

                <span onClick={() => setOpenedRecords([])}>
                  {t('all-items.close')}
                </span>
              </div>
            )}
          </div>

          <List
            dataSource={order.orderHistoryRecords.slice(0, limit)}
            renderItem={(
              orderHistoryRecord: getOrderHistoryRecordsViewerOrderOrderHistoryRecords,
              index,
            ) => (
              <Record
                isOpened={openedRecords.includes(index)}
                setIsOpened={() =>
                  setOpenedRecords(
                    openedRecords.includes(index)
                      ? openedRecords.filter(
                          openedRecord => openedRecord !== index,
                        )
                      : [...openedRecords, index],
                  )
                }
                orderHistoryRecord={filter(recordFragment, orderHistoryRecord)}
              />
            )}
            locale={{
              emptyText: t('empty'),
            }}
            loadMore={
              order.orderHistoryRecords.length < limit ? null : (
                <div className={styles.loadMore}>
                  <div onClick={() => setLimit(limit + 5)}>
                    <div>{t('load-more')}</div>

                    <Icon type="double-left" />
                  </div>
                </div>
              )
            }
            itemLayout="horizontal"
          />
        </div>
      </div>
    );
  },
);

OrderHistoryRecords.getInitialProps = async () => ({
  namespacesRequired: ['order-history-records'],
});

export default OrderHistoryRecords;
