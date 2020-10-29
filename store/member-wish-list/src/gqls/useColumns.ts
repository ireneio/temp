// import
import gql from 'graphql-tag';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail';

// definition
export const useColumnsFragment = gql`
  fragment useColumnsFragment on WishlistProduct {
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
