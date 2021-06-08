// typescript import
import { Resolver } from 'apollo-client/core/LocalState';

// graphql typescript
import {
  getEcfitList_viewer as getEcfitListViewer,
  getEcpayList_viewer as getEcpayListViewer,
  getEcpayListVariables,
  OrdersOrderConnectionFragment_pageInfo as OrdersOrderConnectionFragmentPageInfo,
} from '@meepshop/types/gqls/admin';

// definition
export const resolvers = {
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
      _: unknown,
      __: unknown,
      info: Parameters<Resolver>[3],
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
