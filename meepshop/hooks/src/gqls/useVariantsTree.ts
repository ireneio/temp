// import
import { gql } from '@apollo/client';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
// NO_FILTER
export const useVariantsTreeFragment = gql`
  fragment useVariantsTreeFragment on Product {
    id
    variants {
      id
      specs {
        id
        specId
        title {
          ...localeFragment
        }
      }
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;
