// import
import { gql } from '@apollo/client';

// graphql import
import { formDataFragment } from '@meepshop/form-data/gqls';

// definition
export const useCreateUserFragment = gql`
  fragment useCreateUserFragment on User {
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
  }
`;

export const updateOrders = gql`
  query updateOrders($first: PositiveInt!) {
    viewer {
      id
      ...useCreateUserFragment
    }

    getCartList {
      data {
        id
      }
    }
  }

  ${useCreateUserFragment}
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
