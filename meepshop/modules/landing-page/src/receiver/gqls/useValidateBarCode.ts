// import
import { gql } from '@apollo/client';

// definition
export const useValidateBarCode = gql`
  query useValidateBarCode($barCode: String!) {
    isEInvoiceBarCodeValid(barCode: $barCode)
  }
`;
