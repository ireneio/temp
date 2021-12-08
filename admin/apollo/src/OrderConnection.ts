// typescript import
import { Resolvers } from '@apollo/client';

// graphql typescript
import {
  getEcfitList_viewer as getEcfitListViewer,
  getEcpayList_viewer as getEcpayListViewer,
  getEcpayListVariables,
  OrdersOrderConnectionFragment_pageInfo as OrdersOrderConnectionFragmentPageInfo,
} from '@meepshop/types/gqls/admin';

// definition
export const resolvers: Resolvers = {
  OrderConnection: {
    pageInfo: ({
      pageInfo,
      key,
    }: {
      pageInfo: OrdersOrderConnectionFragmentPageInfo;
      key: string;
    }) => ({
      ...pageInfo,
      key,
    }),
  },
  User: {
    ecfitOrders: (
      parent: getEcfitListViewer & { [key: string]: {} },
      _,
      __,
      info,
    ) => {
      const alias = info?.field.alias?.value || 'orders';

      return {
        ...parent[alias],
        ...(alias === 'orders' ? { key: 'ecfit' } : null),
      };
    },
    orders: (
      parent: getEcpayListViewer & { [key: string]: {} },
      args: getEcpayListVariables,
    ) => ({
      ...parent.orders,
      ...(!args.filter?.logisticTrackingStatus ? null : { key: 'ecpay' }),
    }),
  },
};
