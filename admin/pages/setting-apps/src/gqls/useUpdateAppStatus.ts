// import
import gql from 'graphql-tag';

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
