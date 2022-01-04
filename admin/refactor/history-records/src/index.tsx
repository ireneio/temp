// typescript import
import { NextPage } from 'next';

import { OrderHistoryType } from './hooks/useMutationObserver';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { useCrossContextEvents } from '@admin/hooks';
import OrderHistoryRecords from '@admin/order-history-records';

import useMutationObserver from './hooks/useMutationObserver';
import './styles/index.less';

// graphql import
import { refactorOrderHistoryRecordsFragment } from './gqls';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  orderId: string;
  noWrapper: true;
}

// definition
const RefactorOrderHistoryRecords: NextPage<PropsType> = React.memo(
  ({ orderId }) => {
    const [{ records }, setProps] = useCrossContextEvents<OrderHistoryType>(
      `history-records/${orderId}`,
      { height: 0 },
    );
    const orderHistoryRecordsRef = useMutationObserver(setProps, records);

    if (!records) return null;

    return (
      <div ref={orderHistoryRecordsRef}>
        <OrderHistoryRecords
          auditLogs={filter(refactorOrderHistoryRecordsFragment, records)}
        />
      </div>
    );
  },
);

RefactorOrderHistoryRecords.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  orderId: query.orderId as string,
  noWrapper: true,
});

export default RefactorOrderHistoryRecords;
