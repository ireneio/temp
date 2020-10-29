// import
import gql from 'graphql-tag';

// graphql import
import { formRecipientAddressFragment, formStoreFragment } from './form';
import { useColumnsRecipientAddressFragment } from './useColumns';

// definition
export const getUserRecipients = gql`
  query getUserRecipients {
    viewer {
      id
      shippableRecipientAddresses {
        ...formRecipientAddressFragment
        ...useColumnsRecipientAddressFragment
      }

      store {
        ...formStoreFragment
      }
    }
  }

  ${formRecipientAddressFragment}
  ${useColumnsRecipientAddressFragment}
  ${formStoreFragment}
`;
