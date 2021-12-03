// import
import { gql } from '@apollo/client';

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
