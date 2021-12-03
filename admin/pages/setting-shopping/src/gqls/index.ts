// import
import { gql } from '@apollo/client';

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
