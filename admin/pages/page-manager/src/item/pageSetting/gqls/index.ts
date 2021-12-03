// import
import { gql } from '@apollo/client';

// graphql import
import {
  usePageSettingItemsStoreFragment,
  usePageSettingItemsPageFragment,
} from './usePageSettingItems';
import { editFragment } from './edit';

// definition
export const pageSettingStoreFragment = gql`
  fragment pageSettingStoreFragment on Store {
    id
    ...usePageSettingItemsStoreFragment
  }

  ${usePageSettingItemsStoreFragment}
`;

export const pageSettingPageFragment = gql`
  fragment pageSettingPageFragment on Page {
    ...editFragment
    ...usePageSettingItemsPageFragment
    id
    pageType
  }

  ${editFragment}
  ${usePageSettingItemsPageFragment}
`;
