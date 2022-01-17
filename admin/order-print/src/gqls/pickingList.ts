// imoprt
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { usePickingColumnsFragment } from './usePickingColumns';

// definition
export const pickingListFragment = gql`
  fragment pickingListFragment on User {
    id
    store {
      id
      description {
        name
      }
    }
    order(orderId: $orderId) {
      id
      categories {
        id
        products {
          id
          variantId
          ...usePickingColumnsFragment
        }
      }
    }
  }

  ${localeFragment}
  ${usePickingColumnsFragment}
`;
