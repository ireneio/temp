// import
import { gql } from '@apollo/client';

// graphql import
import { useOrdersColumnsFragment } from '@admin/orders/lib/gqls/useOrdersColumns';

// definition
export const useEcpayColumnsFragment = gql`
  fragment useEcpayColumnsFragment on OrderConnection {
    ...useOrdersColumnsFragment

    edges {
      node {
        latestLogisticTracking {
          status
          providerStatusMessage
        }
      }
    }
  }

  ${useOrdersColumnsFragment}
`;
