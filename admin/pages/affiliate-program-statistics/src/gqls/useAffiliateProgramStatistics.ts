// import
import { gql } from '@apollo/client';

// graphql import
import { ordersAffiliateProgramOrdersConnectionFragment } from './orders';

// definition
export const getAffiliateProgramStatistics = gql`
  query getAffiliateProgramStatistics(
    $input: AffiliateProgramStatisticsInput!
    $first: PositiveInt!
  ) {
    viewer {
      id
      affiliateProgramStatistics(input: $input) {
        ... on AffiliateProgramStatistics {
          affiliateProgram {
            id
            title
            status
          }
          numberOfOrders
          totalAmountForCommission
          totalCommission
        }
      }
      affiliateProgramOrders(first: $first) {
        ...ordersAffiliateProgramOrdersConnectionFragment
      }
    }
  }

  ${ordersAffiliateProgramOrdersConnectionFragment}
`;
