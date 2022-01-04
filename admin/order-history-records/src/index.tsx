// import
import React, { useState } from 'react';
import { filter } from 'graphql-anywhere';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { useTranslation } from '@meepshop/locales';

import Record from './Record';
import styles from './styles/index.less';

// graphql typescript
import { recordFragment as recordFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { recordFragment } from './gqls/record';

// typescript definition
interface PropsType {
  auditLogs: recordFragmentType[];
}

// definition
export default React.memo(({ auditLogs }: PropsType) => {
  const { t } = useTranslation('order-history-records');
  const [limit, setLimit] = useState(5);
  const [openedRecords, setOpenedRecords] = useState<number[]>([]);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        <div className={styles.subTitle}>
          <h2>{t('sub-title')}</h2>

          {auditLogs.length === 0 ? null : (
            <div>
              <span
                onClick={() =>
                  setOpenedRecords(
                    auditLogs.slice(0, limit).map((_, index) => index),
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
          dataSource={auditLogs.slice(0, limit)}
          renderItem={(orderHistoryRecord: recordFragmentType, index) => (
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
            auditLogs.length <= limit ? null : (
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
});
