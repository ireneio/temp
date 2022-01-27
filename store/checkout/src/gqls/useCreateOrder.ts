// import
import { gql } from '@apollo/client';

// graphql import
import { formDataFragment } from '@meepshop/form-data/gqls';

// definition
export const useCreateOrderFragment = gql`
  fragment useCreateOrderFragment on User {
    id
    hasGmoCreditCard
    orders(first: $first) {
      __typename
      edges {
        __typename
        node {
          __typename
          id
        }
      }
      total
    }
    shippableRecipientAddresses {
      __typename
      id
      name
      mobile
      country {
        __typename
        id
      }
      city {
        __typename
        id
      }
      area {
        __typename
        id
      }
      street
      zipCode
    }
    cart {
      ... on Cart {
        cartItems {
          productId
          quantity
          variantId
        }
      }
    }
  }
`;

export const updateOrders = gql`
  query updateOrders($first: PositiveInt!) {
    viewer {
      id
      ...useCreateOrderFragment
    }
  }

  ${useCreateOrderFragment}
`;

export const createOrder = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
        orderNo
        error: _error
        paymentServiceTradeToken
        formData {
          ...formDataFragment
        }
      }
      recipientId
    }
  }

  ${formDataFragment}
`;
