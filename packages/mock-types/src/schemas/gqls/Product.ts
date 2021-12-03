// import
import { gql } from '@apollo/client';

// definition
export const productMockFragment = gql`
  fragment productMockFragment on Product {
    id
    status
    title {
      zh_TW
    }
    variants {
      id
      sku
      stock
      retailPrice
    }
  }
`;
