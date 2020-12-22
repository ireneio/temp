// import
import gql from 'graphql-tag';

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
