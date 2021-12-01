// import
import gql from 'graphql-tag';

// graphql import
import { useUpsellingInitialValuesFragment } from './useUpsellingInitialValues';
import { useUpsellingProductColumnsFragment } from './useUpsellingProductColumns';

// definition
export const getUpsellingSetting = gql`
  query getUpsellingSetting {
    viewer {
      id
      store {
        id
        timezone
        upsellingSetting {
          id
          title
          isActive
          startTime
          endTime
          hasUnlimitedDuration
          hasLimitPerOrder
          limitPerOrder
          products {
            id
            ...useUpsellingProductColumnsFragment
          }
          ...useUpsellingInitialValuesFragment
        }
      }
    }
  }

  ${useUpsellingInitialValuesFragment}
  ${useUpsellingProductColumnsFragment}
`;
