// import
import gql from 'graphql-tag';

// graphql typescript
import { productsObjectTypeProductsObjectTypeFragment as productsObjectTypeProductsObjectTypeFragmentType } from './__generated__/productsObjectTypeProductsObjectTypeFragment';
import { productsObjectTypeOrderApplyFragment as productsObjectTypeOrderApplyFragmentType } from './__generated__/productsObjectTypeOrderApplyFragment';

// typescript definition
interface DefaultDataType {
  getOrderApplyList?: {
    data: (productsObjectTypeOrderApplyFragmentType | null)[] | null;
  };
}

// definition
export const productsObjectTypeProductsObjectTypeFragment = gql`
  fragment productsObjectTypeProductsObjectTypeFragment on productsObjectType {
    id
    quantity
  }
`;

export const productsObjectTypeOrderApplyFragment = gql`
  fragment productsObjectTypeOrderApplyFragment on OrderApply {
    id
    orderProductId
    quantity
    status
  }
`;

export const resolvers = {
  productsObjectType: {
    unappliedQuantity: ({
      id,
      quantity,
      getOrderApplyList,
    }: DefaultDataType & productsObjectTypeProductsObjectTypeFragmentType) => {
      const orderApply = getOrderApplyList?.data?.find(
        getOrderApply => getOrderApply?.orderProductId === id,
      );

      if (!orderApply) return quantity || 0;

      if ([0, 3].includes(orderApply.status || 0)) return 0;

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
