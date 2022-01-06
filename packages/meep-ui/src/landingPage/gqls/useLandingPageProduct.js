import { gql } from '@apollo/client';

export const getLandingPageProduct = gql`
  query getLandingPageProduct(
    $search: searchInputObjectType
    $first: PositiveInt!
  ) {
    computeProductList(search: $search) {
      data {
        id
        title {
          zh_TW
        }
        variants {
          id
          specs {
            id
            specId
            title {
              zh_TW
            }
          }
          currentMinPurchasableQty
          currentMaxPurchasableQty
        }
        specs {
          id
          title {
            zh_TW
          }
        }
      }
    }

    viewer {
      id
      orders(first: $first) {
        edges {
          node {
            id
          }
        }
        total
      }
    }
  }
`;
