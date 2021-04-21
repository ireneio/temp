// import
import gql from 'graphql-tag';

// graphql import
import { useBlockFragment } from './useBlock';

// definition
export const getStoreSetting = gql`
  query getStoreSetting {
    viewer {
      id
      store {
        id
        ...useBlockFragment
      }
    }
  }

  ${useBlockFragment}
`;
