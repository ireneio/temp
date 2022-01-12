import { gql } from '@apollo/client';

import { goToButtonFragment } from '@meepshop/action-button/lib/gqls/goToButton';

import { usePagePageFragment } from './usePage';

export const adminPreview = gql`
  query adminPreview($input: StorePageFilterInput, $isProductPage: Boolean!) {
    defaultStoreProduct @include(if: $isProductPage)
    viewer {
      id
      store {
        id
        page(input: $input) {
          id
          ...usePagePageFragment
          ...goToButtonFragment
        }
        setting {
          backToTopButtonEnabled
        }
      }
    }
  }

  ${usePagePageFragment}
  ${goToButtonFragment}
`;
