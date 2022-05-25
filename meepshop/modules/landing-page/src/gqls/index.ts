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
import {
  useFinishLandingUserFragment,
  useFinishLandingPageModuleFragment,
} from './useFinish';
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
      ...useFinishLandingUserFragment
    }

    ...shoppingLandingPageModuleFragment
    ...receiverLandingPageModuleFragment
    ...usePaymentsLandingPageModuleFragment
    ...useShipmentsLandingPageModuleFragment
    ...useFinishLandingPageModuleFragment
  }

  ${useFinishLandingUserFragment}
  ${localeFragment}
  ${shoppingLandingPageModuleFragment}
  ${receiverUserFragment}
  ${receiverLandingPageModuleFragment}
  ${usePaymentsLandingPageModuleFragment}
  ${useShipmentsLandingPageModuleFragment}
  ${useFinishLandingPageModuleFragment}
`;
