// import
import gql from 'graphql-tag';

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
      currentMaxPurchasableQty
    }

    ...useVariantsTreeFragment
  }

  ${useVariantsTreeFragment}
  ${localeFragment}
`;
