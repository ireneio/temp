// import
import { gql } from '@apollo/client';

// graphql import
import {
  useColumnsWishlistProductFragment,
  useColumnsUserFragment,
} from './useColumns';

// definition
export const getWishlist = gql`
  query getWishlist {
    viewer {
      id
      wishList: wishlist {
        id
        ...useColumnsWishlistProductFragment
      }
      ...useColumnsUserFragment
    }
  }

  ${useColumnsWishlistProductFragment}
  ${useColumnsUserFragment}
`;
