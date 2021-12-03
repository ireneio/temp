// import
import { gql } from '@apollo/client';

// definition
export const updateSettingAppList = gql`
  mutation updateSettingAppList($updateStoreAppList: [UpdateStoreApp]) {
    updateStoreAppList(updateStoreAppList: $updateStoreAppList) {
      id
      isInstalled
      error: _error
    }
  }
`;
