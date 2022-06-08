// graphql typescript
import {
  orderOrderFragment as orderOrderFragmentType,
  orderOrderFragment_products as orderOrderFragmentProducts,
  orderOrderApplyFragment as orderOrderApplyFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface DefaultDataType {
  getOrderApplyList?: {
    data: (orderOrderApplyFragmentType | null)[] | null;
  };
}

interface ApplicationProductType
  extends Omit<orderOrderFragmentProducts, '__typename'> {
  __typename: 'OrderApplyProduct';
}

interface ApplicationType extends orderOrderApplyFragmentType {
  extra: (orderOrderApplyFragmentType & {
    product: ApplicationProductType | null;
  })[];
}

// definition

export const resolvers = {
  Order: {
    applications: ({
      id,
      products,
      getOrderApplyList,
    }: DefaultDataType & orderOrderFragmentType) =>
      (getOrderApplyList?.data || []).reduce((result, getOrderApply) => {
        if (!getOrderApply || getOrderApply?.orderId !== id) return result;

        const application = result.find(
          ({ returnId }) => returnId === getOrderApply.returnId,
        );
        const product = products.find(
          eachProduct =>
            /** SHOULD_NOT_BE_NULL */
            getOrderApply?.orderProductId === (eachProduct?.id || null),
        );

        if (!application)
          return [
            ...result,
            {
              ...getOrderApply,
              extra: [
                {
                  ...getOrderApply,
                  product: !product
                    ? null
                    : {
                        ...product,
                        __typename: 'OrderApplyProduct',
                        id: `OrderApplyProduct:${product.id}`,
                      },
                },
              ],
            },
          ];

        application.extra = [
          ...application.extra,
          {
            ...getOrderApply,
            product: !product
              ? null
              : {
                  ...product,
                  __typename: 'OrderApplyProduct',
                  id: `OrderApplyProduct:${product.id}`,
                },
          },
        ];

        return result;
      }, [] as ApplicationType[]),
  },
  OrderEdge: {
    node: ({ node, getOrderApplyList }: DefaultDataType & { node?: {} }) =>
      !node
        ? null
        : {
            ...node,
            getOrderApplyList,
          },
  },
  OrderConnection: {
    edges: ({ edges, getOrderApplyList }: DefaultDataType & { edges?: [{}] }) =>
      edges?.map(edge =>
        !edge
          ? null
          : {
              ...edge,
              getOrderApplyList,
            },
      ),
  },
  User: {
    order: ({ order, getOrderApplyList }: DefaultDataType & { order?: {} }) =>
      !order
        ? null
        : {
            ...order,
            getOrderApplyList,
          },
    orders: ({
      orders,
      getOrderApplyList,
    }: DefaultDataType & { orders?: {} }) =>
      !orders
        ? null
        : {
            ...orders,
            getOrderApplyList,
          },
  },
  Query: {
    viewer: ({
      viewer,
      getOrderApplyList,
    }: DefaultDataType & { viewer?: {} }) =>
      !viewer
        ? null
        : {
            ...viewer,
            getOrderApplyList,
          },
  },
};
