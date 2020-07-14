// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment productIframeFragment on ProductIframeModule {
    id
    product(productId: $productId) {
      id
      info {
        zh_TW
      }
    }
  }
`;
