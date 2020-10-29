// import
import gql from 'graphql-tag';

// graphql import
import { useColumnsFragment } from './useColumns';

// definition
export const getWishlist = gql`
  query getWishlist {
    viewer {
      id
      wishlist {
        id
        ...useColumnsFragment
      }
    }
  }

  ${useColumnsFragment}
`;
