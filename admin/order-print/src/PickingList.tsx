// imoprt
import React from 'react';
import { Table } from 'antd';

import { useTranslation } from '@meepshop/locales';

import usePickingColumns from './hooks/usePickingColumns';
import styles from './styles/pickingList.less';

// graphql typescript
import {
  pickingListFragment as pickingListFragmentType,
  usePickingColumnsFragment as usePickingColumnsFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: pickingListFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('order-print');
  const columns = usePickingColumns();
  const products = viewer?.order?.categories?.[0]?.products || [];

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <p className={styles.storeName}>{viewer?.store?.description?.name}</p>
        {t('picking-list')}
      </div>

      <Table<usePickingColumnsFragmentType>
        className={styles.table}
        columns={columns}
        dataSource={products.filter(Boolean) as usePickingColumnsFragmentType[]}
        rowKey="id"
        pagination={false}
      />
      <div className={styles.total}>
        {t('total')}：
        {products.reduce(
          (total, product) => total + (product?.quantity || 0),
          0,
        )}
      </div>
    </div>
  );
});
