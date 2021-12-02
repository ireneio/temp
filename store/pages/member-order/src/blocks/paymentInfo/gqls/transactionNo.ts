// import
import { gql } from '@apollo/client';

// definition
export const transactionNoFragment = gql`
  fragment transactionNoFragment on paymentInfoType {
    id
    list {
      id
      transactionNo
    }
  }
`;
