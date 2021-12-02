// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { shoppingLandingPageModuleFragment } from './shopping';
import {
  receiverUserFragment,
  receiverLandingPageModuleFragment,
} from '../receiver/gqls';
import { usePaymentsLandingPageModuleFragment } from './usePayments';
import { useShipmentsLandingPageModuleFragment } from './useShipments';
import { useSubmitLandingPageModuleFragment } from './useSubmit';

// definition
export const landingPageLandingPageModuleFragment = gql`
  fragment landingPageLandingPageModuleFragment on LandingPageModule {
    id
    width
    agreedMatters
    product {
      id
      title {
        ...localeFragment
      }
      variants {
        id
        totalPrice
      }
    }

    viewer {
      id
      ...receiverUserFragment
    }

    ...shoppingLandingPageModuleFragment
    ...receiverLandingPageModuleFragment
    ...usePaymentsLandingPageModuleFragment
    ...useShipmentsLandingPageModuleFragment
    ...useSubmitLandingPageModuleFragment
  }

  ${localeFragment}
  ${shoppingLandingPageModuleFragment}
  ${receiverUserFragment}
  ${receiverLandingPageModuleFragment}
  ${usePaymentsLandingPageModuleFragment}
  ${useShipmentsLandingPageModuleFragment}
  ${useSubmitLandingPageModuleFragment}
`;
