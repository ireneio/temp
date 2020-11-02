// import
import gql from 'graphql-tag';

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
