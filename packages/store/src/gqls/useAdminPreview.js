import gql from 'graphql-tag';

import { usePagePageFragment } from './usePage';

export const adminPreview = gql`
  query adminPreview(
    $input: StorePageFilterInput
    $identity: String
    $isProductPage: Boolean!
  ) {
    defaultStoreProduct @include(if: $isProductPage)
    viewer {
      id
      store {
        id
        page(input: $input) {
          id
          ...usePagePageFragment
        }
      }
    }
  }

  ${usePagePageFragment}
`;
