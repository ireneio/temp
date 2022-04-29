// import
import { gql } from '@apollo/client';

// graphql import
import { useAddRecipientAddressFragment } from './useAddRecipientAddress';

// definition
export const useSaveFragment = gql`
  fragment useSaveFragment on User {
    id
    ...useAddRecipientAddressFragment
  }

  ${useAddRecipientAddressFragment}
`;
