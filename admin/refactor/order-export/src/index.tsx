// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

import { useCrossContextEvents } from '@admin/hooks';
import OrderExport from '@admin/order-export';

import './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: true;
}

// definition
const RefactorOrderExport: NextPage<PropsType> = React.memo(() => {
  const [{ ids }, setProps] = useCrossContextEvents<{
    ids?: string[];
    closePanel?: boolean;
  }>('order-export', {});

  if (!ids) return null;

  return (
    <OrderExport
      ids={ids}
      onClose={() => {
        setProps({ closePanel: true });
      }}
    />
  );
});

RefactorOrderExport.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  noWrapper: true,
});

export default RefactorOrderExport;
