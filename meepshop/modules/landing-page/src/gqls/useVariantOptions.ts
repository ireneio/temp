// import
import { gql } from '@apollo/client';

// graphql import
import { useVariantsTreeFragment } from '@meepshop/hooks/lib/gqls/useVariantsTree';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useVariantOptionsFragment = gql`
  fragment useVariantOptionsFragment on Product {
    id
    variants {
      id
      specs {
        id
        specId
        title {
          zh_TW
          en_US
        }
      }
      currentMinPurchasableQty
    }

    ...useVariantsTreeFragment
  }

  ${useVariantsTreeFragment}
  ${localeFragment}
`;
