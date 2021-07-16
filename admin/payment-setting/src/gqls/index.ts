// import
import gql from 'graphql-tag';

// graphql import
import { useInitialValuesStoreBillingSettingFragment } from './useInitialValues';
import { invoiceFragment } from './invoice';
import { paymentFragment } from './payment';

// definition
export const getBilling = gql`
  query getBilling {
    viewer {
      id
      store {
        id
        setting {
          billing {
            billingType

            ...useInitialValuesStoreBillingSettingFragment

            invoice {
              ...invoiceFragment
            }
          }
        }
        ...paymentFragment
      }
    }
  }

  ${useInitialValuesStoreBillingSettingFragment}
  ${invoiceFragment}
  ${paymentFragment}
`;
