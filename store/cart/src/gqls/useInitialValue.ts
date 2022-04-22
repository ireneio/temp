// import
import { gql } from '@apollo/client';

// definition
export const useInitialValueFragment = gql`
  fragment useInitialValueFragment on LineItem {
    id
    quantity
    status
    type
    productId
    variantId
  }
`;
