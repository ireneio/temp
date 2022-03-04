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
        render: (value, { node: { id } }) => (
          <Link href={`/orders/${id}`}>
            <a href={`/orders/${id}`}>{value}</a>
          </Link>
        ),
      },
      {
        dataIndex: ['node', 'createdAt'],
        title: t('order.createdAt'),
        width: 192,
        align: 'center',
        render: value => format(new Date(value), 'yyyy/MM/dd HH:mm:ss'),
      },
      {
        dataIndex: ['node', 'paymentStatus'],
        title: t('order.paymentStatus'),
        width: '10%',
        align: 'center',
        render: value => t(`paymentStatus.${value}`),
      },
      {
        dataIndex: ['node', 'orderStatus'],
        title: t('order.orderStatus'),
        width: '10%',
        align: 'center',
        render: value => t(`orderStatus.${value}`),
      },
      {
        dataIndex: ['node', 'total'],
        title: t('order.total'),
        width: 160,
        align: 'right',
        render: value => c(value),
      },
      {
        dataIndex: ['node', 'freight'],
        title: t('order.freight'),
        width: 160,
        align: 'right',
        render: value => c(value),
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
        render: value => c(value),
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
        render: value => c(value),
      },
    ],
    [t, c],
  );
};
