// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const detailFragment = gql`
  fragment detailFragment on OrderAuditLog {
    orderProductQuantityDelta {
      sku
      name
      specs {
        id
        title {
          ...localeFragment
        }
      }
      beforeQuantity
      afterQuantity
    }
    productsAmountDelta {
      before
      after
    }
    adjustAmountDelta {
      before
      after
    }
    totalAmountDelta {
      before
      after
    }
  }

  ${localeFragment}
`;
