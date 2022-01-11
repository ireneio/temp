// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const usePackingColumnsFragment = gql`
  fragment usePackingColumnsFragment on productsObjectType {
    id
    title {
      ...localeFragment
    }
    variantId
    retailPrice
    totalPrice
    quantity
    sku
    vendorSku
    warehouseNumber
    type
    specs {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;
