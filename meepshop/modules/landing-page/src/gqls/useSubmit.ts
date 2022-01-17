// import
import { gql } from '@apollo/client';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useCreateOrderInLandingPageFragment } from './useCreateOrder';

// definition
export const useSubmitLandingPageModuleFragment = gql`
  fragment useSubmitLandingPageModuleFragment on LandingPageModule {
    id
    redirectPage {
      ...useLinkFragment
    }
    product {
      id
    }
    viewer {
      id
      email
      ...useCreateOrderInLandingPageFragment
    }
  }

  ${useCreateOrderInLandingPageFragment}
  ${useLinkFragment}
`;

export const useSubmitOrderFragment = gql`
  fragment useSubmitOrderFragment on Order {
    id
    priceInfo {
      currency
      shipmentFee
      paymentFee
      productPrice
      total
    }
    categories {
      products {
        id
        sku
        type
        title {
          zh_TW
          en_US
        }
        specs {
          id
          title {
            zh_TW
            en_US
          }
        }
        productId
        variantId
        quantity
        totalPrice
      }
    }
  }
`;
