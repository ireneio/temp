// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

import { useCrossContextEvents } from '@admin/hooks';
import OrdersTag from '@admin/orders-tag';

import './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: true;
}

// definition
const RefactorOrdersTag: NextPage<PropsType> = React.memo(() => {
  const [{ orderIds }, setProps] = useCrossContextEvents<{
    isTagPanelOpen?: boolean;
    orderIds?: string[];
  }>('orders-tag', {});

  if (!orderIds) return null;

  return (
    <OrdersTag
      orderIds={orderIds}
      onClose={() => {
        setProps({
          isTagPanelOpen: false,
        });
      }}
    />
  );
});

RefactorOrdersTag.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  noWrapper: true,
});

export default RefactorOrdersTag;
