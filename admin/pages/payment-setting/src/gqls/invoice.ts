// import
import { gql } from '@apollo/client';

// definition
export const invoiceFragment = gql`
  fragment invoiceFragment on StoreBillingInvoiceSetting {
    accountType
    email
    name
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
`;
