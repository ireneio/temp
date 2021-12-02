// import
import { gql } from '@apollo/client';

// definition
export const useValidateInvoiceVAT = gql`
  query useValidateInvoiceVAT($ban: String!) {
    isBANValid(ban: $ban)
  }
`;
