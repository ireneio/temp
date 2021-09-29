// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const editFragment = gql`
  fragment editFragment on Page {
    id
    title {
      ...localeFragment
    }
    pageType
    path
    tabTitle
    seo {
      keywords
      description
      image
    }
  }

  ${localeFragment}
`;
