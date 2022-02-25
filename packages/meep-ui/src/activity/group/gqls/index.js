import { gql } from '@apollo/client';

export const getProductsInActivity = gql`
  query getProductsInActivity($search: searchInputObjectType) {
    computeProductList(search: $search) {
      data {
        id
        title {
          zh_TW
          en_US
        }
        coverImage {
          id
          scaledSrc {
            w60
            w120
            w240
            w480
            w720
            w960
            w1200
            w1440
            w1680
            w1920
          }
        }
        variants {
          id
          retailPrice
        }
      }
      total
    }
  }
`;
