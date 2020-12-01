// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

// definition
export const useVariantOptionsFragment = gql`
  fragment useVariantOptionsFragment on Product {
    title {
      ...localeFragment
    }
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
      stock
      maxPurchaseLimit
      minPurchaseItems
      totalPrice
    }
    specs {
      id
      title {
        zh_TW
        en_US
      }
    }
  }

  ${localeFragment}
`;
