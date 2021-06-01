// typescript import
import { ContextType } from '@meepshop/apollo';

// graphql typescript
import {
  createOrderApplyWithOrderOrderApplyFragment as createOrderApplyWithOrderOrderApplyFragmentType,
  getOrderCache as getOrderCacheType,
  updateOrderApplyCache as updateOrderApplyCacheType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  getOrderCache,
  updateOrderApplyCache,
} from './gqls/createOrderApplyWithOrder';

// definition
export const resolvers = {
  Mutation: {
    createOrderApplyWithOrder: (
      {
        createOrderApplyList,
      }: {
        createOrderApplyList: createOrderApplyWithOrderOrderApplyFragmentType[];
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
      const applications = orderCache?.getOrderApplyList?.data;
      const order = orderCache?.viewer?.order;
      const getOrderApplyList = {
        __typename: 'OrderApplyList' as const,
        data: [...(createOrderApplyList || []), ...(applications || [])],
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
