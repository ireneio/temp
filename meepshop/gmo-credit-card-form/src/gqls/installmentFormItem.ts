// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const getGmoAvailableInstallments = gql`
  query getGmoAvailableInstallments($storePaymentId: String!, $bin: String!) {
    gmoBankInstallment(storePaymentId: $storePaymentId, bin: $bin) {
      name {
        ...localeFragment
      }
      code
      installments
    }

    allGmoBankInstallments(storePaymentId: $storePaymentId) {
      name {
        ...localeFragment
      }
      code
      installments
    }
  }

  ${localeFragment}
`;
