// typescript import
import { loadMoreType } from './hooks/useProgramStatisticsLoadMore';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Table from '@admin/table';

import useProgramStatisticsColumns from './hooks/useProgramStatisticsColumns';
import useProgramStatisticsLoadMore from './hooks/useProgramStatisticsLoadMore';
import useExportOrders from './hooks/useExportOrders';
import styles from './styles/orders.less';

// graphql typescript
import {
  ordersAffiliateProgramOrdersConnectionFragment as ordersAffiliateProgramOrdersConnectionFragmentType,
  useProgramStatisticsColumnsFragment as useProgramStatisticsColumnsFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useProgramStatisticsColumnsFragment } from './gqls/useProgramStatisticsColumns';
import { useProgramStatisticsLoadMoreFragment } from './gqls/useProgramStatisticsLoadMore';

// typescript defintion
interface PropsType extends loadMoreType {
  affiliateProgramId: string;
  affiliateProgramOrders: ordersAffiliateProgramOrdersConnectionFragmentType | null;
}

// definition
export default React.memo(
  ({
    loading,
    fetchMore,
    affiliateProgramId,
    affiliateProgramOrders,
  }: PropsType) => {
    const { t } = useTranslation('affiliate-program-statistics');
    const columns = useProgramStatisticsColumns();
    const { current, onChange } = useProgramStatisticsLoadMore(
      filter(useProgramStatisticsLoadMoreFragment, affiliateProgramOrders),
      { loading, fetchMore },
    );
    const exportOrders = useExportOrders(affiliateProgramId);

    return (
      <Table<useProgramStatisticsColumnsFragmentType>
        className={styles.root}
        loading={loading}
        dataSource={filter(
          useProgramStatisticsColumnsFragment,
          (affiliateProgramOrders?.edges || []).slice(
            current * 10,
            (current + 1) * 10,
          ),
        )}
        columns={columns}
        pagination={{
          total: affiliateProgramOrders?.total || 0,
          current,
          onChange,
        }}
        locale={{ emptyText: t('empty') }}
        rowKey={({ node: { id } }) => id}
        scroll={{ x: 740 }}
      >
        <div className={styles.title}>
          {t('order.title')}

          <Button onClick={exportOrders}>{t('order.export')}</Button>
        </div>
      </Table>
    );
  },
);
