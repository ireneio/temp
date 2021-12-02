// import
import { gql } from '@apollo/client';

// definition
export const backToTopFragment = gql`
  fragment backToTopFragment on Store {
    id
    setting {
      backToTopButtonEnabled
    }
  }
`;
