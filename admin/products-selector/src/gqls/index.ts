// import
import gql from 'graphql-tag';

// graphql import
import { headerFragment } from './header';
import { useChangeProductsPageFragment } from './useChangeProductsPage';
import { useProductsColumnsFragment } from './useProductsColumns';

// definition
export const getProducts = gql`
  query getProducts(
    $first: PositiveInt!
    $cursor: String
    $filter: AdminProductsFilterInput
    $search: searchInputObjectType
  ) {
    viewer {
      id
      store {
        id
        adminProducts(first: $first, after: $cursor, filter: $filter) {
          edges {
            node {
              id
              ...useProductsColumnsFragment
            }
          }
          pageInfo {
            currentInfo(input: { pageId: "products-selector" }) @client {
              id
              current
            }
          }
          total
          ...useChangeProductsPageFragment
        }
      }
    }
    getTagList(search: $search) {
      data {
        id
        ...headerFragment
      }
    }
  }

  ${headerFragment}
  ${useChangeProductsPageFragment}
  ${useProductsColumnsFragment}
`;
