// import
import { gql } from '@apollo/client';

// graphql import
import { useMergeCartUserFragment } from './useMergeCart';

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

export const useUpsertCartUserFragment = gql`
  fragment useUpsertCartUserFragment on User {
    id
    ...useMergeCartUserFragment
  }

  ${useMergeCartUserFragment}
`;

export const upsertCart = gql`
  mutation upsertCart($isShopper: Boolean!, $input: [CartItemInput!]!) {
    upsertCart(input: $input) @include(if: $isShopper) {
      ...useUpsertCartUpsertCartResponseFragment
    }
    upsertGuestCart(input: $input) @client @skip(if: $isShopper) {
      ...useUpsertCartUpsertCartResponseFragment
    }
  }

  ${useUpsertCartUpsertCartResponseFragment}
`;
