// import
import gql from 'graphql-tag';

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
