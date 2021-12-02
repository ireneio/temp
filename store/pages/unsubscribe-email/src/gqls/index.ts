// import
import { gql } from '@apollo/client';

// definition
export const getStoreName = gql`
  query getStoreName {
    viewer {
      id
      store {
        id
        description {
          name
        }
      }
    }
  }
`;
