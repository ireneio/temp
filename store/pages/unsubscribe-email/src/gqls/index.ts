// import
import gql from 'graphql-tag';

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
