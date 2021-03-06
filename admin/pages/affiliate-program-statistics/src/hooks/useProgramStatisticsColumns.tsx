// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo, useContext } from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import { Currency as CurrencyContext } from '@meepshop/context';
import Tooltip from '@admin/tooltip';

// graphql typescript
import { useProgramStatisticsColumnsFragment as useProgramStatisticsColumnsFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (): ColumnProps<useProgramStatisticsColumnsFragmentType>[] => {
  const { t } = useTranslation('affiliate-program-statistics');
  const { c } = useContext(CurrencyContext);

  return useMemo(
    () => [
      {
        dataIndex: ['node', 'orderNo'],
        title: t('order.orderNo'),
        width: 144,
        fixed: 'left',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['orderNo'],
          { node: { orderId } },
        ) => (
          <Link href={`/orders/${orderId}`}>
            <a href={`/orders/${orderId}`}>{value}</a>
          </Link>
        ),
      },
      {
        dataIndex: ['node', 'createdAt'],
        title: t('order.createdAt'),
        width: 192,
        align: 'center',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['createdAt'],
        ) => format(new Date(value), 'yyyy/MM/dd HH:mm:ss'),
      },
      {
        dataIndex: ['node', 'paymentStatus'],
        title: t('order.paymentStatus'),
        width: '10%',
        align: 'center',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['paymentStatus'],
        ) => t(`paymentStatus.${value}`),
      },
      {
        dataIndex: ['node', 'orderStatus'],
        title: t('order.orderStatus'),
        width: '10%',
        align: 'center',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['orderStatus'],
        ) => t(`orderStatus.${value}`),
      },
      {
        dataIndex: ['node', 'total'],
        title: t('order.total'),
        width: 160,
        align: 'right',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['total'],
        ) => c(value, true),
      },
      {
        dataIndex: ['node', 'freight'],
        title: t('order.freight'),
        width: 160,
        align: 'right',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['freight'],
        ) => c(value, true),
      },
      {
        dataIndex: ['node', 'totalExcludeFreight'],
        title: (
          <>
            {t('order.totalExcludeFreight.title')}

            <Tooltip title={t('order.totalExcludeFreight.tooltip')} />
          </>
        ),
        width: 160,
        align: 'right',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['totalExcludeFreight'],
        ) => c(value, true),
      },
      {
        dataIndex: ['node', 'commission'],
        title: (
          <>
            {t('order.commission.title')}

            <Tooltip title={t('order.commission.tooltip')} />
          </>
        ),
        width: 160,
        align: 'right',
        render: (
          value: useProgramStatisticsColumnsFragmentType['node']['commission'],
        ) => c(value, true),
      },
    ],
    [t, c],
  );
};
