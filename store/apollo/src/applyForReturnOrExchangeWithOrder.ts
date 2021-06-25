// typescript import
import { ContextType } from '@meepshop/apollo';

// graphql typescript
import {
  applyForReturnOrExchange_applyForReturnOrExchange as applyForReturnOrExchangeApplyForReturnOrExchangeType,
  getOrderCache as getOrderCacheType,
  updateOrderApplyCache as updateOrderApplyCacheType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  getOrderCache,
  updateOrderApplyCache,
} from './gqls/applyForReturnOrExchangeWithOrder';

// definition
export const resolvers = {
  Mutation: {
    applyForReturnOrExchangeWithOrder: (
      {
        applyForReturnOrExchange,
      }: {
        applyForReturnOrExchange: applyForReturnOrExchangeApplyForReturnOrExchangeType;
      },
      { orderId }: { orderId: string },
      { cache }: ContextType,
    ) => {
      const orderCache = cache.readQuery<getOrderCacheType>({
        query: getOrderCache,
        variables: {
          orderId,
        },
      });
      const order = orderCache?.viewer?.order;

      if (
        applyForReturnOrExchange.__typename !==
        'OrderProductsAppliedForReturnOrExchange'
      )
        return order || null;

      const applications = orderCache?.getOrderApplyList?.data;
      const getOrderApplyList = {
        __typename: 'OrderApplyList' as const,
        data: [
          ...(applyForReturnOrExchange.result || [])
            .map(orderApply =>
              orderApply
                ? {
                    ...orderApply,
                    __typename: 'OrderApply' as const,
                  }
                : null,
            )
            .filter(Boolean),
          ...(applications || []),
        ],
      };

      cache.writeQuery<updateOrderApplyCacheType>({
        query: updateOrderApplyCache,
        data: {
          getOrderApplyList,
        },
      });

      return !order
        ? null
        : {
            ...order,
            status: 3,
            getOrderApplyList,
          };
    },
  },
};
