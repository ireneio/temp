// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// definition
export const getCartWhenPaymentFail = gql`
  query getCartWhenPaymentFail {
    viewer {
      id
      ...useCartFragment
    }
  }

  ${useCartFragment}
`;
