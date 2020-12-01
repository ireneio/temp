// import
import gql from 'graphql-tag';

// definition
export const useValidateInvoiceVAT = gql`
  query useValidateInvoiceVAT($ban: String!) {
    isBANValid(ban: $ban)
  }
`;
