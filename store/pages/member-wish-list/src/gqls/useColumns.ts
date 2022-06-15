// import
import { gql } from '@apollo/client';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

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
      ...localeFragment
    }
    createdAt
  }

  ${thumbnailFragment}
  ${localeFragment}
`;

export const useColumnsUserFragment = gql`
  fragment useColumnsUserFragment on User {
    id
    ...useRemoveFragment
  }

  ${useRemoveFragment}
`;
