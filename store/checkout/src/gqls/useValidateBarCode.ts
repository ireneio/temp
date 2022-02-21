// import
import { gql } from '@apollo/client';

// definition
export const isEInvoiceBarCodeValid = gql`
  query isEInvoiceBarCodeValid($barCode: String!) {
    isEInvoiceBarCodeValid(barCode: $barCode)
  }
`;
