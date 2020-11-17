// import
import gql from 'graphql-tag';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail';

import { useRemoveFragment } from './useRemove';

// definition
export const useColumnsWishlistProductFragment = gql`
  fragment useColumnsWishlistProductFragment on WishlistProduct {
    id
    coverImage {
      ...thumbnailFragment
    }
    productId
    isAvailableForSale
    title {
      zh_TW
    }
    createdAt
  }

  ${thumbnailFragment}
`;

export const useColumnsUserFragment = gql`
  fragment useColumnsUserFragment on User {
    id
    ...useRemoveFragment
  }

  ${useRemoveFragment}
`;
