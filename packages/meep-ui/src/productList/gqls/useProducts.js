import { gql } from '@apollo/client';

export const getProducts = gql`
  query getProducts($search: searchInputObjectType) {
    computeProductList(search: $search) {
      data {
        id
        title {
          zh_TW
          en_US
        }
        description {
          zh_TW
          en_US
        }
        variants {
          id
          stock
          listPrice
          suggestedPrice
          retailPrice
        }
        coverImage {
          id
          imageExists
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
        showUserPrice {
          showListPrice
          showSuggestedPrice
        }
      }
      total
    }
  }
`;
