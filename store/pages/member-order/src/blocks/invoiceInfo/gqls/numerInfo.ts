// import
import { gql } from '@apollo/client';

// definition
export const numberInfoFragment = gql`
  fragment numberInfoFragment on OrderInvoice {
    id
    status
    code
    issuedAt
  }
`;
