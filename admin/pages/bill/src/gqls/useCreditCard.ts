// import
import { gql } from '@apollo/client';

// definition
export const payStoreBillWithTpPrime = gql`
  mutation payStoreBillWithTpPrime($input: PayStoreBillWithTpPrimeInput) {
    payStoreBillWithTpPrime(input: $input) {
      status
    }
  }
`;

export const payStoreBillWithTpCardId = gql`
  mutation payStoreBillWithTpCardId($input: PayStoreBillWithTpCardIdInput) {
    payStoreBillWithTpCardId(input: $input) {
      status
    }
  }
`;
