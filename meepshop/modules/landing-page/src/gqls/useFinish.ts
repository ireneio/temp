// import
import { gql } from '@apollo/client';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useCreateOrderInLandingPageFragment } from './useCreateOrder';

// definition
export const useFinishLandingUserFragment = gql`
  fragment useFinishLandingUserFragment on User {
    id
    orders {
      edges {
        node {
          id
        }
      }
      total
    }
  }
`;

export const useFinishLandingPageModuleFragment = gql`
  fragment useFinishLandingPageModuleFragment on LandingPageModule {
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
      ...useFinishLandingUserFragment
      ...useCreateOrderInLandingPageFragment
    }
  }

  ${useFinishLandingUserFragment}
  ${useCreateOrderInLandingPageFragment}
  ${useLinkFragment}
`;

export const useFinishOrderFragment = gql`
  fragment useFinishOrderFragment on Order {
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
