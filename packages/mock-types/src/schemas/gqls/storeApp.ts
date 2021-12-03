// import
import { gql } from '@apollo/client';

// definition
export const storeAppMockFragment = gql`
  fragment storeAppMockFragment on StoreApp {
    isInstalled
    plugin
  }
`;
