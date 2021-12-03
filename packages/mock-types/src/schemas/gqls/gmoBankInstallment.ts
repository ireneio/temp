// import
import { gql } from '@apollo/client';

// definition
export const gmoBankInstallmentMockFragment = gql`
  fragment gmoBankInstallmentMockFragment on GmoBankInstallment {
    name {
      zh_TW
    }
    code
    installments
  }
`;
