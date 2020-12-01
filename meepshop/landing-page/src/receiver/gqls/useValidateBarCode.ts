// import
import gql from 'graphql-tag';

// definition
export const useValidateBarCode = gql`
  query useValidateBarCode($barCode: String!) {
    isEInvoiceBarCodeValid(barCode: $barCode)
  }
`;
