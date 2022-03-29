// import
import { gql } from '@apollo/client';

// graphql import
import { ordersAffiliateProgramOrdersConnectionFragment } from './orders';

// definition
export const getAffiliateProgramStatistics = gql`
  query getAffiliateProgramStatistics(
    $affiliateProgramId: ID!
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
        filter: { affiliateProgramId: $affiliateProgramId }
      ) {
        ...ordersAffiliateProgramOrdersConnectionFragment
      }
    }
  }

  ${ordersAffiliateProgramOrdersConnectionFragment}
`;
