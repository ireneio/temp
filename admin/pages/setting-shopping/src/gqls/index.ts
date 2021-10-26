// import
import gql from 'graphql-tag';

// graphql impor
import { useShoppingInitialValuesFragment } from './useShoppingInitialValues';

// definition
export const getShoppingSetting = gql`
  query getShoppingSetting {
    viewer {
      id
      store {
        id
        setting {
          ...useShoppingInitialValuesFragment
        }
      }
    }
  }

  ${useShoppingInitialValuesFragment}
`;
