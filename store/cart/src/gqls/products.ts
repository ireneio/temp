// import
import { gql } from '@apollo/client';

// graphql import
import {
  useProductsColumnsUserFragment,
  useProductsColumnsLineItemFragment,
} from './useProductsColumns';

// definition
export const productsUserFragment = gql`
  fragment productsUserFragment on User {
    id
    ...useProductsColumnsUserFragment
  }

  ${useProductsColumnsUserFragment}
`;

export const productsLineItemFragment = gql`
  fragment productsLineItemFragment on LineItem {
    id
    ...useProductsColumnsLineItemFragment
  }

  ${useProductsColumnsLineItemFragment}
`;
