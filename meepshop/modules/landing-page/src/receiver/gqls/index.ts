// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { useInvoiceOptionsFragment } from './useInvoiceOptions';

// definition
export const receiverUserFragment = gql`
  fragment receiverUserFragment on User {
    id
    role
    store {
      id
      cname
      setting {
        ...useInvoiceOptionsFragment
      }
    }
  }

  ${useInvoiceOptionsFragment}
`;

export const receiverLandingPageModuleFragment = gql`
  fragment receiverLandingPageModuleFragment on LandingPageModule {
    shippableCountries {
      id
      name {
        ...localeFragment
      }

      children: cities {
        id
        name {
          ...localeFragment
        }

        children: areas {
          id
          name {
            ...localeFragment
          }
          zipCodes
        }
      }
    }
    invoice {
      required
    }
    gender {
      required
    }
    birthday {
      required
    }
    note {
      required
    }
  }

  ${localeFragment}
`;
