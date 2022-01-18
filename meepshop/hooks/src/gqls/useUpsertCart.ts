// import
import { gql } from '@apollo/client';

// graphql import
import { useMergeCartFragment } from './useMergeCart';

// definition
const useUpsertCartUpsertCartResponseFragment = gql`
  fragment useUpsertCartUpsertCartResponseFragment on UpsertCartResponse {
    ... on OkResponse {
      message
    }
    ... on UnauthenticatedError {
      message
    }
    ... on UnhandledError {
      message
    }
  }
`;

export const upsertCart = gql`
  mutation upsertCart(
    $isShopper: Boolean!
    $input: [CartItemInput!]!
    $guestInput: [CartItemInput!]!
  ) {
    upsertCart(input: $input) @include(if: $isShopper) {
      ...useUpsertCartUpsertCartResponseFragment
    }

    upsertGuestCart(input: $guestInput) @client {
      ...useUpsertCartUpsertCartResponseFragment
    }
  }

  ${useUpsertCartUpsertCartResponseFragment}
`;

export const useUpsertCartUserFragment = gql`
  fragment useUpsertCartUserFragment on User {
    __typename
    id
    cart {
      __typename
      ... on Cart {
        cartItems {
          ...useMergeCartFragment
        }
      }
    }

    guestCart @client {
      __typename
      ... on GuestCart {
        cartItems {
          ...useMergeCartFragment
        }
      }
    }
  }

  ${useMergeCartFragment}
`;
