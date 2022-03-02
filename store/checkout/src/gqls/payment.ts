// import
import { gql } from '@apollo/client';

// definition
export const paymentPaymentObjectTypeFragment = gql`
  fragment paymentPaymentObjectTypeFragment on paymentObjectType {
    paymentId
    name
    description
  }
`;
