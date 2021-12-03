// import
import { gql } from '@apollo/client';

// definition
export const updateStoreAppList = gql`
  mutation updateStoreAppList($updateStoreAppList: [UpdateStoreApp]) {
    updateStoreAppList(updateStoreAppList: $updateStoreAppList) {
      id
      isInstalled
      error: _error
    }
  }
`;
