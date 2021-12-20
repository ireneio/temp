// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const headerStoreFragment = gql`
  fragment headerStoreFragment on Store {
    id
    domain
    defaultDomain
    page(input: $input) {
      id
      title {
        ...localeFragment
      }
      pageType
      path
    }
  }

  ${localeFragment}
`;
