// import
import { gql } from '@apollo/client';

// graphql import
import {
  useProductsColumnsInPreviewerUserFragment,
  useProductsColumnsInPreviewerLineItemFragment,
} from './useProductsColumns';

// definition
export const productsInPreviewerUserFragment = gql`
  fragment productsInPreviewerUserFragment on User {
    id
    ...useProductsColumnsInPreviewerUserFragment
  }

  ${useProductsColumnsInPreviewerUserFragment}
`;

export const productsInPreviewerLineItemFragment = gql`
  fragment productsInPreviewerLineItemFragment on LineItem {
    id
    ...useProductsColumnsInPreviewerLineItemFragment
  }

  ${useProductsColumnsInPreviewerLineItemFragment}
`;
