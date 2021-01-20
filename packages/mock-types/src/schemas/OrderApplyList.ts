// import
import mock from '../mock';

// graphql typescript
import { orderApplyListMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<orderApplyListMockFragment>('OrderApplyList', [
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 0,
        returnId: 'return-id-1',
        applicationType: 'return',
        applicationStatus: 0,
      },
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 0,
        returnId: 'return-id-1',
        applicationType: 'return',
        applicationStatus: 10,
      },
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 1,
        returnId: 'return-id-2',
        applicationType: 'replace',
        applicationStatus: 0,
      },
    ],
  }),
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 1,
      },
    ],
  }),
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 2,
      },
    ],
  }),
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 3,
      },
    ],
  }),
]);
