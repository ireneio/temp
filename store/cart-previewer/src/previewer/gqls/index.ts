// import
import { gql } from '@apollo/client';

// graphql import
import { useComputedCartInPreviewerFragment } from './useComputedCart';
import { productsInPreviewerUserFragment } from './products';

// definition
export const previewerUserFragment = gql`
  fragment previewerUserFragment on User {
    id
    ...useComputedCartInPreviewerFragment
    ...productsInPreviewerUserFragment
  }

  ${useComputedCartInPreviewerFragment}
  ${productsInPreviewerUserFragment}
`;
