// import
import { gql } from '@apollo/client';

// graphql import
import { ordersAffiliateProgramOrdersConnectionFragment } from './orders';

// definition
export const getAffiliateProgramStatistics = gql`
  query getAffiliateProgramStatistics(
    $affiliateProgramId: ID!
    $after: String
    $first: PositiveInt!
  ) {
    viewer {
      id
      affiliateProgramStatistics(
        input: { affiliateProgramId: $affiliateProgramId }
      ) {
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
      affiliateProgramOrders(
        first: $first
        after: $after
        filter: { affiliateProgramId: $affiliateProgramId }
      ) {
        ...ordersAffiliateProgramOrdersConnectionFragment
      }
    }
  }

  ${ordersAffiliateProgramOrdersConnectionFragment}
`;
