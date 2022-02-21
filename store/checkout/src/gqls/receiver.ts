// import
import { gql } from '@apollo/client';

// graphql import
import { useInvoiceOptionsStoreInvoiceSettingFragment } from './useInvoiceOptions';
import { useSynchronizeUserInfoFragment } from './useSynchronizeUserInfo';
import { useSaveAsReceiverTemplateFragment } from './useSaveAsReceiverTemplate';

// definition
export const receiverStoreFragment = gql`
  fragment receiverStoreFragment on Store {
    id
    shippableCountries {
      id
    }
    setting {
      checkoutFields {
        name
        mobile
        address
      }
      invoice {
        ...useInvoiceOptionsStoreInvoiceSettingFragment
      }
    }
  }

  ${useInvoiceOptionsStoreInvoiceSettingFragment}
`;

export const receiverInCheckoutUserFragment = gql`
  fragment receiverInCheckoutUserFragment on User {
    id
    ...useSynchronizeUserInfoFragment
    ...useSaveAsReceiverTemplateFragment
  }

  ${useSynchronizeUserInfoFragment}
  ${useSaveAsReceiverTemplateFragment}
`;
