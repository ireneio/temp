// import
import gql from 'graphql-tag';

// definition
export const useValidateLoveCode = gql`
  query useValidateLoveCode($loveCode: String!) {
    isEInvoiceLoveCodeValid(loveCode: $loveCode)
  }
`;
