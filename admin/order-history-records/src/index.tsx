// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { DoubleLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Spin, List } from 'antd';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { meepshopLogo } from '@meepshop/images';

import Record from './Record';
import styles from './styles/index.less';

// graphql typescript
import {
  getOrderHistoryRecords as getOrderHistoryRecordsType,
  getOrderHistoryRecordsVariables,
  getOrderHistoryRecords_viewer_order_auditLogs as getOrderHistoryRecordsViewerOrderOrderHistoryRecords,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getOrderHistoryRecords } from './gqls';
import { recordFragment } from './gqls/record';

// typescript definition
interface PropsType {
  orderId: string;
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
        orderId,
      },
    });
    const [limit, setLimit] = useState(5);
    const [openedRecords, setOpenedRecords] = useState<number[]>([]);
    const order = data?.viewer?.order;

    if (!order) return <Spin indicator={<LoadingOutlined spin />} />;

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

            <div>
              {format(new Date(order.createdAt), 'yyyy/MM/dd HH:mm:ss')}
            </div>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.subTitle}>
            <h2>{t('sub-title')}</h2>

            {order.auditLogs.length === 0 ? null : (
              <div>
                <span
                  onClick={() =>
                    setOpenedRecords(
                      order.auditLogs.slice(0, limit).map((_, index) => index),
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
            dataSource={order.auditLogs.slice(0, limit)}
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
              order.auditLogs.length <= limit ? null : (
                <div className={styles.loadMore}>
                  <div onClick={() => setLimit(limit + 5)}>
                    <div>{t('load-more')}</div>

                    <DoubleLeftOutlined />
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

OrderHistoryRecords.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  orderId: query.orderId as string,
});

export default OrderHistoryRecords;
