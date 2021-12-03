// import
import { gql } from '@apollo/client';

// definition
export const menuModuleMockFragment = gql`
  fragment menuModuleMockFragment on MenuModule {
    menu {
      id
    }
  }
`;
