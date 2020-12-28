// import
import gql from 'graphql-tag';

// definition
export const useVariantsTreeFragment = gql`
  fragment useVariantsTreeFragment on Product {
    id
    variants {
      id
      specs {
        id
        specId
        title {
          zh_TW
          en_US
        }
      }
    }
    specs {
      id
      title {
        zh_TW
        en_US
      }
    }
  }
`;
