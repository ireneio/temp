// import
import gql from 'graphql-tag';

// definition
export const numberInfoFragment = gql`
  fragment numberInfoFragment on OrderInvoice {
    id
    status
    code
    issuedAt
  }
`;
