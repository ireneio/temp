// import
import gql from 'graphql-tag';

// definition
export const menuModuleMockFragment = gql`
  fragment menuModuleMockFragment on MenuModule {
    menu {
      id
    }
  }
`;
