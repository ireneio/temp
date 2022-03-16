// import
import { gql } from '@apollo/client';

// graphql import
import { useActivitiesFragment } from './useActivities';

// definition
export const totalOrderFragment = gql`
  fragment totalOrderFragment on Order {
    priceInfo {
      currency
      shipmentFee
      paymentFee
      productPrice
      userPoints
      canUsePointsLimit
      total
    }
    ...useActivitiesFragment
  }

  ${useActivitiesFragment}
`;
