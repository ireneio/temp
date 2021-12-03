// import
import { gql } from '@apollo/client';

// definition
export const ezPaymentReturnListObjectTypeMockFragment = gql`
  fragment ezPaymentReturnListObjectTypeMockFragment on ezPaymentReturnListObjectType {
    paycode
    storeName
    orderNumber
    amount
    expireDate
  }
`;
