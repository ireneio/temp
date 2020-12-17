// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useColumnsRecipientAddressFragment = gql`
  fragment useColumnsRecipientAddressFragment on RecipientAddress {
    id
    name
    mobile
    country {
      id
      name {
        ...localeFragment
      }
    }
    city {
      id
      name {
        ...localeFragment
      }
    }
    area {
      id
      name {
        ...localeFragment
      }
    }
    zipCode
    street
  }

  ${localeFragment}
`;
