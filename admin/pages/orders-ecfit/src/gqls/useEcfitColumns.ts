// import
import { gql } from '@apollo/client';

// graphql import
import { useOrdersColumnsFragment } from '@admin/orders/lib/gqls/useOrdersColumns';

// definition
export const useEcfitColumnsFragment = gql`
  fragment useEcfitColumnsFragment on OrderConnection {
    ...useOrdersColumnsFragment

    edges {
      node {
        lastEcfitRequestRecord {
          createdAt
          response
        }
      }
    }
  }

  ${useOrdersColumnsFragment}
`;
