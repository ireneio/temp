// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment productVideoFragment on ProductVideoModule {
    id
    width
    ratio
    product(productId: $productId) {
      id
      videoLink {
        value
      }
    }
  }
`;
