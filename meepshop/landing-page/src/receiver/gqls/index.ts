// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const receiverFragment = gql`
  fragment receiverFragment on LandingPageModule {
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
