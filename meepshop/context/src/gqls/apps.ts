// import
import { gql } from '@apollo/client';

// definition
export const getApps = gql`
  query getApps {
    getStoreAppList {
      data {
        id
        appId
        plugin
        isInstalled
      }
    }

    getAppList {
      data {
        id
        plugin
      }
    }
  }
`;
