// import
import gql from 'graphql-tag';

// definition
export const paymentObjectTypeMockFragment = gql`
  fragment paymentObjectTypeMockFragment on paymentObjectType {
    name
    template
    description
    atm {
      bankName
      bankCode
      account
      expireDate
    }
  }
`;
