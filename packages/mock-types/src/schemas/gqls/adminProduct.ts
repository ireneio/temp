// import
import { gql } from '@apollo/client';

// definition
export const adminProductMockFragment = gql`
  fragment adminProductMockFragment on AdminProduct {
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
