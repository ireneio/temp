// import
import gql from 'graphql-tag';

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
