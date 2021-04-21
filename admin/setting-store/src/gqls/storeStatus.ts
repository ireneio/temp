// import
import gql from 'graphql-tag';

// definition
export const storeStatusFragment = gql`
  fragment storeStatusFragment on Store {
    id
    metaData {
      storeStatus
    }
  }
`;
