// import
import { gql } from '@apollo/client';

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
