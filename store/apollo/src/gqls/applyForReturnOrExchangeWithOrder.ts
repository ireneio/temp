// import
import { gql } from '@apollo/client';

// graphql import
import { orderOrderFragment, orderOrderApplyFragment } from './order';
import {
  productsObjectTypeOrderApplyFragment,
  availableProductsForApplyOrderFragment,
} from './productsObjectType';

// defintion
export const applyForReturnOrExchangeWithOrderOrderClientFragment = gql`
  fragment applyForReturnOrExchangeWithOrderOrderClientFragment on Order {
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

export const applyForReturnOrExchangeWithOrderOrderFragment = gql`
  fragment applyForReturnOrExchangeWithOrderOrderFragment on Order {
    id
    ...availableProductsForApplyOrderFragment
    ...orderOrderFragment
  }

  ${availableProductsForApplyOrderFragment}
  ${orderOrderFragment}
`;

export const applyForReturnOrExchangeWithOrderOrderApplyFragment = gql`
  fragment applyForReturnOrExchangeWithOrderOrderApplyFragment on OrderApply {
    id
    ...orderOrderApplyFragment
    ...productsObjectTypeOrderApplyFragment
  }

  ${orderOrderApplyFragment}
  ${productsObjectTypeOrderApplyFragment}
`;

export const applyForReturnOrExchangeWithOrderOrderProductAppliedForReturnOrExchangeFragment = gql`
  fragment applyForReturnOrExchangeWithOrderOrderProductAppliedForReturnOrExchangeFragment on OrderProductAppliedForReturnOrExchange {
    id
    orderId
    returnId
    orderProductId
    status
    quantity
  }
`;

export const getOrderCache = gql`
  query getOrderCache($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        ...applyForReturnOrExchangeWithOrderOrderFragment
      }
    }

    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...applyForReturnOrExchangeWithOrderOrderApplyFragment
      }
    }
  }

  ${applyForReturnOrExchangeWithOrderOrderFragment}
  ${applyForReturnOrExchangeWithOrderOrderApplyFragment}
`;

export const updateOrderApplyCache = gql`
  query updateOrderApplyCache {
    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...applyForReturnOrExchangeWithOrderOrderApplyFragment
      }
    }
  }

  ${applyForReturnOrExchangeWithOrderOrderApplyFragment}
`;
