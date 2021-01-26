// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { couponStatusFragment } from './couponStatus';
import { useVariantOptionsFragment } from './useVariantOptions';

// definition
export const shoppingOrderFragment = gql`
  fragment shoppingOrderFragment on Order {
    id
    errorObj {
      code
      params {
        name
        value
      }
    }

    ...couponStatusFragment
  }

  ${couponStatusFragment}
`;

export const shoppingLandingPageModuleFragment = gql`
  fragment shoppingLandingPageModuleFragment on LandingPageModule {
    quantity {
      required
    }
    product {
      id
      title {
        ...localeFragment
      }
      variants {
        id
        totalPrice
      }

      ...useVariantOptionsFragment
    }
  }

  ${localeFragment}
  ${useVariantOptionsFragment}
`;
