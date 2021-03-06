// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useOptionsFragment = gql`
  fragment useOptionsFragment on GmoBankInstallment {
    name {
      ...localeFragment
    }
    code
    installments
  }
  ${localeFragment}
`;
