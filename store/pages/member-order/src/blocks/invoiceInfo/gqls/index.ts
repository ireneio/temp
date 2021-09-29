// import
import gql from 'graphql-tag';

// graphql import
import { numberInfoFragment } from './numerInfo';

// definition
export const invoiceInfoFragment = gql`
  fragment invoiceInfoFragment on OrderInvoice {
    ...numberInfoFragment
    id
    type
    method
    carrier {
      carrierType: type
      carrierCode: code
    }
    loveCode
    title
    ban
    address
  }

  ${numberInfoFragment}
`;
