// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const usePickingColumnsFragment = gql`
  fragment usePickingColumnsFragment on productsObjectType {
    id
    vendorSku
    sku
    title {
      ...localeFragment
    }
    warehouseNumber
    specs {
      id
      title {
        ...localeFragment
      }
    }
    quantity
  }

  ${localeFragment}
`;
