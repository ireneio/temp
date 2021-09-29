// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { format, parse } from 'date-fns';

import { format as currencyFormat } from '@meepshop/context/lib/Currency';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import styles from '../styles/useColumns.less';

// graphql typescript
import {
  getBills_viewer_store_bills_edges as getBillsViewerStoreBillsEdges,
  useColumnsFragment as useColumnsFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  store: useColumnsFragmentType | null,
): ColumnProps<getBillsViewerStoreBillsEdges>[] => {
  const { t } = useTranslation('bill-payment');

  const currency = store?.currency;

  return useMemo(
    () => [
      {
        dataIndex: ['node', 'month'],
        title: t('bill-month'),
        width: currency === 'TWD' ? '22%' : '28%',
        render: (value, { node: { id } }) => (
          <Link href={`/bill-payment/${id}`}>
            <span className={styles.month}>
              {format(parse(value, 'yyyyMM', new Date()), 'yyyy.MM')}
            </span>
          </Link>
        ),
      },
      {
        dataIndex: ['node', 'totalFee'],
        title: t('fee-usd'),
        width: currency === 'TWD' ? '28%' : '36%',
        render: value => currencyFormat('USD', value).split(' ')[1],
      },
      ...(currency === 'TWD'
        ? [
            {
              dataIndex: ['node', 'localTotalFee'],
              title: t('fee-twd'),
              width: '28%',
              render: (value: number) =>
                currencyFormat('TWD', value).split(' ')[1],
            },
          ]
        : []),
      {
        dataIndex: ['node', 'payment', 'status'],
        title: t('payment-status'),
        width: currency === 'TWD' ? '22%' : '36%',
        render: (value, record) => {
          if (record?.node?.payment?.method === 'NO_NEED_TO_PAY') {
            return <span className={styles.status}>{t('no-need-to-pay')}</span>;
          }

          return (
            <span
              className={`${styles.status} ${
                value === 'PAID' ? '' : styles.unpaid
              }`}
            >
              {value === 'PAID' ? t('paid') : t('unpaid')}
            </span>
          );
        },
      },
    ],
    [t, currency],
  );
};
