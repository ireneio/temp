// import
import gql from 'graphql-tag';

// definition
export const productDraftTextFragment = gql`
  fragment productDraftTextFragment on ProductDraftTextModule {
    id
    product {
      id
      draftText {
        value
      }
    }
  }
`;
