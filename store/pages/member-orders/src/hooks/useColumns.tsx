// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { format } from 'date-fns';

import filter from '@meepshop/utils/lib/filter';

import Actions from '../Actions';
import MobileColumn from '../MobileColumn';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

// graphql typescript
import {
  useColumnsOrdersFragment,
  useColumnsOrdersFragment_node as useColumnsOrdersFragmentNode,
  useColumnsOrdersFragment_node_paymentInfo as useColumnsOrdersFragmentNodePaymentInfo,
  useColumnsOrdersFragment_node_shipmentInfo as useColumnsOrdersFragmentNodeShipmentInfo,
} from '@meepshop/types/gqls/store';

// import graphql
import { actionsFragment } from '../gqls/actions';

// definition
export default (): ColumnProps<useColumnsOrdersFragment>[] => {
  const { t } = useTranslation('member-orders');

  return useMemo(
    () => [
      {
        title: t('date'),
        dataIndex: ['node', 'createdAt'],
        render: (value: useColumnsOrdersFragmentNode['createdAt']) =>
          format(new Date(value || new Date()), 'yyyy/MM/dd'),
        width: 130,
      },
      {
        title: t('order.no'),
        dataIndex: ['node', 'orderNo'],
        render: (
          value: useColumnsOrdersFragmentNode['orderNo'],
          { node: { id } }: useColumnsOrdersFragment,
        ) => (
          <Link href={`/order/${id}`}>
            <a href={`/order/${id}`}>{value}</a>
          </Link>
        ),
        width: 150,
      },
      {
        title: t('payment.title'),
        dataIndex: ['node', 'paymentInfo', 'status'],
        render: (value: useColumnsOrdersFragmentNodePaymentInfo['status']) =>
          t(`payment.${value}`),
        width: 130,
      },
      {
        title: t('shipment.title'),
        dataIndex: ['node', 'shipmentInfo', 'status'],
        render: (value: useColumnsOrdersFragmentNodeShipmentInfo['status']) =>
          t(`shipment.${value}`),
        width: 130,
      },
      {
        title: t('status.title'),
        dataIndex: ['node', 'status'],
        render: (value: useColumnsOrdersFragmentNode['status']) =>
          t(`status.${value}`),
        width: 130,
      },
      {
        key: 'action',
        dataIndex: ['node'],
        render: (value: useColumnsOrdersFragmentNode) => (
          <Actions order={filter(actionsFragment, value)} />
        ),
      },
      {
        key: 'mobileStyle',
        dataIndex: ['node'],
        render: (value: useColumnsOrdersFragmentNode) => (
          <MobileColumn {...value}>
            <Actions order={filter(actionsFragment, value)} />
          </MobileColumn>
        ),
      },
    ],
    [t],
  );
};
