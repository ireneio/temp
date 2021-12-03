import { gql } from '@apollo/client';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

export const getActivity = gql`
  query getActivity($input: StoreActivityFilterInput) {
    viewer {
      id
      store {
        id
        activity(input: $input) {
          id
          target {
            groups {
              id
              title {
                ...localeFragment
              }
              tags
              products {
                productId
              }
              method
              value
              operator
              params {
                tags
                price {
                  gte
                  lte
                }
                search
                includedAllTags
              }
            }
          }
        }
      }
    }
  }

  ${localeFragment}
`;
