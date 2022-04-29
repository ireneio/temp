// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { useDeleteRecipientAddressFragment } from './useDeleteRecipientAddress';

// definition
export const useRecipientColumnsRecipientAddressFragment = gql`
  fragment useRecipientColumnsRecipientAddressFragment on RecipientAddress {
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

export const useRecipientColumnsUserFragment = gql`
  fragment useRecipientColumnsUserFragment on User {
    id
    shippableRecipientAddresses {
      id
      ...useRecipientColumnsRecipientAddressFragment
    }
    ...useDeleteRecipientAddressFragment
  }

  ${useRecipientColumnsRecipientAddressFragment}
  ${useDeleteRecipientAddressFragment}
`;
