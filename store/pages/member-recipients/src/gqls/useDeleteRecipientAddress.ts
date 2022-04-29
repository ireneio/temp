// import
import { gql } from '@apollo/client';

// definition
export const deleteRecipientAddress = gql`
  mutation deleteRecipientAddress($input: DeleteRecipientAddressInput!) {
    deleteRecipientAddress(input: $input) {
      status
    }
  }
`;

export const useDeleteRecipientAddressFragment = gql`
  fragment useDeleteRecipientAddressFragment on User {
    id
    shippableRecipientAddresses {
      id
    }
  }
`;
