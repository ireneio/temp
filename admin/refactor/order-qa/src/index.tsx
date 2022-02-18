// typescript import
import { NextPage } from 'next';

// import
import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import { useCrossContextEvents } from '@admin/hooks';
import OrderQa from '@admin/order-qa';

import './styles/index.less';

// graphql typescript
import {
  getOrderReplied as getOrderRepliedType,
  getOrderRepliedVariables as getOrderRepliedVariablesType,
} from '@meepshop/types/gqls/admin';

// grphaql import
import { getOrderReplied } from './gqls/index';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  orderId: string;
  noWrapper: true;
}

// definition
const RefactorOrderQa: NextPage<PropsType> = React.memo(({ orderId }) => {
  const [{ messageReplied }, setProps] = useCrossContextEvents<{
    closePanel?: boolean;
    messageReplied?: boolean | null;
  }>(`order-qa/${orderId}`, {});
  const client = useApolloClient();

  useEffect(() => {
    const queryOrderReplied = client
      .watchQuery<getOrderRepliedType, getOrderRepliedVariablesType>({
        query: getOrderReplied,
        variables: {
          orderId,
        },
      })
      .subscribe(({ data }) => {
        const messageRepliedData = data.viewer?.order?.messageReplied || null;

        if (
          messageReplied !== undefined &&
          messageRepliedData !== null &&
          messageReplied !== messageRepliedData
        )
          setProps({ messageReplied: true });
      });

    return () => {
      queryOrderReplied.unsubscribe();
    };
  }, [client, messageReplied, orderId, setProps]);

  return (
    <OrderQa
      orderId={orderId}
      onClose={() => {
        setProps({ closePanel: true });
      }}
    />
  );
});

RefactorOrderQa.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  orderId: query.orderId as string,
  noWrapper: true,
});

export default RefactorOrderQa;
