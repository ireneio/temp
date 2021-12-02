// import
import { gql } from '@apollo/client';

// definition
export const useValidateLoveCode = gql`
  query useValidateLoveCode($loveCode: String!) {
    isEInvoiceLoveCodeValid(loveCode: $loveCode)
  }
`;
