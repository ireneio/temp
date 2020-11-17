// import
import gql from 'graphql-tag';

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
