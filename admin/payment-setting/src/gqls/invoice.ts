// import
import gql from 'graphql-tag';

// definition
export const invoiceFragment = gql`
  fragment invoiceFragment on StoreBillingInvoiceSetting {
    accountType
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
