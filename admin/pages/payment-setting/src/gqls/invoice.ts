// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

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

  ${localeFragment}
`;
