// import
import { gql } from '@apollo/client';

// graphql import
import { useColumnsProductFragment } from './useColumns';
import { applicableShipmentsModalAdminProductsConnectionFragment } from './applicableShipmentsModal';

// definition
export const getAdminProducts = gql`
  query getAdminProducts(
    $first: PositiveInt!
    $after: String
    $filter: AdminProductsFilterInput
  ) {
    viewer {
      id
      store {
        id
        adminProducts(first: $first, after: $after, filter: $filter)
          @connection(key: "adminProducts", filter: ["after", "filter"]) {
          edges {
            cursor
            node {
              id
              ...useColumnsProductFragment
            }
          }

          ...applicableShipmentsModalAdminProductsConnectionFragment

          pageInfo {
            endCursor
            currentInfo(input: { pageId: "products-designated-shipments" })
              @client {
              id
              current
            }
          }
          total
        }
      }
    }
  }

  ${useColumnsProductFragment}
  ${applicableShipmentsModalAdminProductsConnectionFragment}
`;

export const setProductsCurrent = gql`
  mutation setProductsCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;
