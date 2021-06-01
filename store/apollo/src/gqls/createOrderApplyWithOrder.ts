// import
import gql from 'graphql-tag';

// graphql import
import { orderOrderFragment, orderOrderApplyFragment } from './order';
import {
  productsObjectTypeOrderApplyFragment,
  availableProductsForApplyOrderFragment,
} from './productsObjectType';

// defintion
export const createOrderApplyWithOrderOrderClientFragment = gql`
  fragment createOrderApplyWithOrderOrderClientFragment on Order {
    id
    applications {
      id
      extra {
        id
        product {
          id
        }
      }
    }
    products {
      id
      availableQuantity
    }
    isAvailableForPayLater
    isAvailableForOrderApply
    isOrderApplied
    status
  }
`;

export const createOrderApplyWithOrderOrderFragment = gql`
  fragment createOrderApplyWithOrderOrderFragment on Order {
    id
    ...availableProductsForApplyOrderFragment
    ...orderOrderFragment
  }

  ${availableProductsForApplyOrderFragment}
  ${orderOrderFragment}
`;

export const createOrderApplyWithOrderOrderApplyFragment = gql`
  fragment createOrderApplyWithOrderOrderApplyFragment on OrderApply {
    id
    ...orderOrderApplyFragment
    ...productsObjectTypeOrderApplyFragment
  }

  ${orderOrderApplyFragment}
  ${productsObjectTypeOrderApplyFragment}
`;

export const getOrderCache = gql`
  query getOrderCache($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        ...createOrderApplyWithOrderOrderFragment
      }
    }

    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...createOrderApplyWithOrderOrderApplyFragment
      }
    }
  }

  ${createOrderApplyWithOrderOrderFragment}
  ${createOrderApplyWithOrderOrderApplyFragment}
`;

export const updateOrderApplyCache = gql`
  query updateOrderApplyCache {
    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...createOrderApplyWithOrderOrderApplyFragment
      }
    }
  }

  ${createOrderApplyWithOrderOrderApplyFragment}
`;
