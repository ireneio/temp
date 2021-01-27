// import
import gql from 'graphql-tag';

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
