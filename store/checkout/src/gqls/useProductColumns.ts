// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useProductColumnsFragment = gql`
  fragment useProductColumnsFragment on productsObjectType {
    id
    cartId
    productId
    variantId
    type
    quantity
    retailPrice
    coverImage {
      scaledSrc {
        w120
      }
    }
    title {
      ...localeFragment
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
    activityInfo {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;
