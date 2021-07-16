// import
import gql from 'graphql-tag';

// graphql import
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
                zh_TW
              }
            }
            city {
              id
              name {
                zh_TW
              }
            }
            area {
              id
              name {
                zh_TW
              }
            }
            street
            zipCode
          }
        }
      }
    }
  }
`;
