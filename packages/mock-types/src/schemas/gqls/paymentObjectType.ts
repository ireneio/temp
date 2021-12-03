// import
import { gql } from '@apollo/client';

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
