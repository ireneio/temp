// import
import { gql } from '@apollo/client';

// definition
export const isEInvoiceLoveCodeValid = gql`
  query isEInvoiceLoveCodeValid($loveCode: String!) {
    isEInvoiceLoveCodeValid(loveCode: $loveCode)
  }
`;
