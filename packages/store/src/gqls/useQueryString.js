// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// definition
export const getCart = gql`
  query getCart {
    viewer {
      id
      ...useCartFragment
    }
  }

  ${useCartFragment}
`;
