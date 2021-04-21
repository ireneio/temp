// import
import gql from 'graphql-tag';

// definition
export const setStoreStatus = gql`
  mutation setStoreStatus($input: SetStoreStatusInput!) {
    setStoreStatus(input: $input) {
      result
    }
  }
`;

export const useUpdateStoreStatusFragment = gql`
  fragment useUpdateStoreStatusFragment on Store {
    id
    metaData {
      storeStatus
    }
  }
`;
