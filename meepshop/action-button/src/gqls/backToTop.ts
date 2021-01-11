// import
import gql from 'graphql-tag';

// definition
export const backToTopFragment = gql`
  fragment backToTopFragment on Store {
    id
    setting {
      backToTopButtonEnabled
    }
  }
`;
