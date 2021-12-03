// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import {
  pageSettingStoreFragment,
  pageSettingPageFragment,
} from '../pageSetting/gqls';
import { prefixIconStoreFragment, prefixIconPageFragment } from './prefixIcon';

// definition
export const itemStoreFragment = gql`
  fragment itemStoreFragment on Store {
    id
    ...pageSettingStoreFragment
    ...prefixIconStoreFragment
  }

  ${pageSettingStoreFragment}
  ${prefixIconStoreFragment}
`;

export const itemPageFragment = gql`
  fragment itemPageFragment on Page {
    ...pageSettingPageFragment
    ...prefixIconPageFragment
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
  ${pageSettingPageFragment}
  ${prefixIconPageFragment}
`;
