// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { invoiceFragment } from './invoice';

// definition
export const setStoreBillingEmailSetting = gql`
  mutation setStoreBillingEmailSetting(
    $input: SetStoreBillingEmailSettingInput!
  ) {
    setStoreBillingEmailSetting(input: $input) {
      status
    }
  }
`;

export const setStoreBillingInvoiceSetting = gql`
  mutation setStoreBillingInvoiceSetting(
    $input: SetStoreBillingInvoiceSettingInput!
  ) {
    setStoreBillingInvoiceSetting(input: $input) {
      status
      billingSetting {
        invoice {
          ...invoiceFragment
        }
      }
    }
  }

  ${invoiceFragment}
`;

export const useSetInvoiceEmailStoreFragment = gql`
  fragment useSetInvoiceEmailStoreFragment on Store {
    id
    setting {
      billing {
        invoice {
          email
        }
      }
    }
  }
`;

export const useSetInvoiceStoreFragment = gql`
  fragment useSetInvoiceStoreFragment on Store {
    id
    setting {
      billing {
        invoice {
          accountType
          name
          email
          title
          ban
          addressV2 {
            country {
              id
              name {
                ...localeFragment
              }
            }
            city {
              id
              name {
                ...localeFragment
              }
            }
            area {
              id
              name {
                ...localeFragment
              }
            }
            street
            zipCode
          }
        }
      }
    }
  }

  ${localeFragment}
`;
