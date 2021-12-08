// import
import { gql } from '@apollo/client';

// definition
export const LineItemFragment = gql`
  fragment LineItemFragment on LineItem {
    id
    productId
  }
`;
