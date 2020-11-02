// import
import gql from 'graphql-tag';

// definition
export const storeAppMockFragment = gql`
  fragment storeAppMockFragment on StoreApp {
    isInstalled
    plugin
  }
`;
