// import
import gql from 'graphql-tag';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { shoppingLandingPageModuleFragment } from './shopping';
import { receiverFragment } from '../receiver/gqls';
import { usePaymentsLandingPageModuleFragment } from './usePayments';
import { useShipmentsLandingPageModuleFragment } from './useShipments';

// definition
const landingPageUserFragment = gql`
  fragment landingPageUserFragment on User {
    id
    role
    email
    store {
      id
      cname
      setting {
        invoice {
          paper {
            duplicate {
              isEnabled
            }
            triplicate {
              isEnabled
            }
            donation {
              isEnabled
            }
          }
          electronic {
            type
            triplicate {
              isEnabled
            }
            donation {
              isEnabled
            }
            membershipCarrier {
              isEnabled
            }
            citizenDigitalCertificateCarrier {
              isEnabled
            }
            mobileBarCodeCarrier {
              isEnabled
            }
          }
        }
      }
    }
  }
`;

export const landingPageLandingPageModuleFragment = gql`
  fragment landingPageLandingPageModuleFragment on LandingPageModule {
    id
    width
    agreedMatters
    redirectPage {
      ...useLinkFragment
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
    }

    viewer {
      ...landingPageUserFragment
    }

    ...shoppingLandingPageModuleFragment
    ...receiverFragment
    ...usePaymentsLandingPageModuleFragment
    ...useShipmentsLandingPageModuleFragment
  }

  ${useLinkFragment}
  ${localeFragment}
  ${landingPageUserFragment}
  ${shoppingLandingPageModuleFragment}
  ${receiverFragment}
  ${usePaymentsLandingPageModuleFragment}
  ${useShipmentsLandingPageModuleFragment}
`;
