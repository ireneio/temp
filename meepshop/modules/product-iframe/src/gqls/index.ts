// import
import { gql } from '@apollo/client';

// definition
export const productIframeFragment = gql`
  fragment productIframeFragment on ProductIframeModule {
    id
    product {
      id
      info {
        zh_TW
      }
    }
  }
`;
