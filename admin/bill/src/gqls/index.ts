// import
import gql from 'graphql-tag';

// graphql import
import { infoFragment } from './info';
import { paymentStoreBillingSettingFragment } from './payment';
import { useItemsStoreBillFragment } from './useItems';
import { totalFragment } from './total';

// definition
export const getBill = gql`
  query getBill($billId: ID!) {
    viewer {
      id
      store {
        id
        bill(billId: $billId) {
          id
          ...infoFragment
          ...useItemsStoreBillFragment
          ...totalFragment
        }
        setting {
          billing {
            ...paymentStoreBillingSettingFragment
          }
        }
      }
    }
  }

  ${infoFragment}
  ${paymentStoreBillingSettingFragment}
  ${useItemsStoreBillFragment}
  ${totalFragment}
`;
