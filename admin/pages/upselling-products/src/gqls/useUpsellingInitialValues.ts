// import
import { gql } from '@apollo/client';

// graphql import
import { useUpsellingProductColumnsFragment } from './useUpsellingProductColumns';

// definition
export const useUpsellingInitialValuesFragment = gql`
  fragment useUpsellingInitialValuesFragment on UpsellingSetting {
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
  }

  ${useUpsellingProductColumnsFragment}
`;
