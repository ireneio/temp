// graphql typescript
import {
  productsObjectTypeOrderApplyFragment as productsObjectTypeOrderApplyFragmentType,
  availableProductsForApplyOrderFragment as availableProductsOrderFragmentType,
  availableProductsForApplyOrderFragment_products as availableProductsOrderFragmentProductsType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface DefaultDataType {
  getOrderApplyList?: {
    data: (productsObjectTypeOrderApplyFragmentType | null)[] | null;
  };
}

// definition
export const resolvers = {
  productsObjectType: {
    availableQuantity: ({
      id,
      quantity,
      getOrderApplyList,
    }: DefaultDataType & availableProductsOrderFragmentProductsType) => {
      const orderApply = getOrderApplyList?.data?.find(
        getOrderApply => getOrderApply?.orderProductId === id,
      );

      if (!orderApply) return quantity || 0;

      return [0, 3].includes(orderApply.status || 0)
        ? 0
        : (quantity || 0) - (orderApply.quantity || 0);
    },
  },
  Order: {
    products: ({
      products,
      getOrderApplyList,
    }: DefaultDataType & { products?: [{}] }) =>
      products?.map(product =>
        !product
          ? null
          : {
              ...product,
              getOrderApplyList,
            },
      ),
    availableProductsForApply: ({
      products,
      getOrderApplyList,
    }: DefaultDataType & {
      products?: availableProductsOrderFragmentType['products'];
    }) => {
      const filterProducts = (products || []).filter(
        product => product?.type !== 'gift',
      ) as availableProductsOrderFragmentProductsType[];

      return filterProducts.map(product =>
        !product
          ? null
          : {
              ...product,
              getOrderApplyList,
            },
      );
    },
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
