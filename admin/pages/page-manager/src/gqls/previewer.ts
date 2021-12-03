// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const previewerStoreFragment = gql`
  fragment previewerStoreFragment on Store {
    id
    domain
    defaultDomain
  }
`;

export const previewerPageFragment = gql`
  fragment previewerPageFragment on Page {
    id
    title {
      ...localeFragment
    }
    pageType
    path
  }

  ${localeFragment}
`;
