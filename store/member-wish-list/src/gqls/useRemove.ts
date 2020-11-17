// import
import gql from 'graphql-tag';

// definition
export const removeProductFromWishList = gql`
  mutation removeProductFromWishList($input: RemoveWishlistProductInput!) {
    removeWishlistProduct(input: $input) {
      success
    }
  }
`;

export const useRemoveFragment = gql`
  fragment useRemoveFragment on User {
    id
    wishList: wishlist {
      __typename
      id
      productId
    }
  }
`;
