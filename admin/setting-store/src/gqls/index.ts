// import
import gql from 'graphql-tag';

// graphql import
import { useBlockFragment } from './useBlock';
import { useInitialValuesFragment } from './useInitialValues';

// definition
export const getStoreSetting = gql`
  query getStoreSetting {
    viewer {
      id
      store {
        id
        ...useBlockFragment
        ...useInitialValuesFragment
      }
    }
  }

  ${useBlockFragment}
  ${useInitialValuesFragment}
`;
