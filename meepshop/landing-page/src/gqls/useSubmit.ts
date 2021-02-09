// import
import gql from 'graphql-tag';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useCreateOrderFragment } from './useCreateOrder';

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
      ...useCreateOrderFragment
    }
  }

  ${useCreateOrderFragment}
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
