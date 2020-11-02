// import
import gql from 'graphql-tag';

// definition
export const wishlistProductMockFragment = gql`
  fragment wishlistProductMockFragment on WishlistProduct {
    id
    productId
    title {
      zh_TW
    }
    coverImage {
      __typename
    }
    isAvailableForSale
  }
`;
