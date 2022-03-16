// import
import { gql } from '@apollo/client';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { useUpdateUserFragment } from './useUpdateUser';
import { useCreateOrderFragment } from './useCreateOrder';

// definition
export const getCheckoutInfo = gql`
  query getCheckoutInfo($first: PositiveInt!) {
    viewer {
      id
      name
      additionalInfo {
        mobile
      }
      address {
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        street
        zipCode
      }
      store {
        id
        setting {
          checkoutFields {
            name
            mobile
            address
          }
        }
        lineLoginSetting {
          ...lineFragment
        }
      }
      ...useUpdateUserFragment
      ...useCreateOrderFragment
      ...useCartFragment
    }
  }

  ${lineFragment}
  ${useUpdateUserFragment}
  ${useCreateOrderFragment}
  ${useCartFragment}
`;
