// import
import { gql } from '@apollo/client';

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
