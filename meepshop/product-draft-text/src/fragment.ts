// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment productDraftTextFragment on ProductDraftTextModule {
    id
    product(productId: $productId) {
      id
      draftText {
        value
      }
    }
  }
`;
