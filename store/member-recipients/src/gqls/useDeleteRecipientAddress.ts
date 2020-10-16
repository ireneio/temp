// import
import gql from 'graphql-tag';

// definition
export const deleteRecipientAddress = gql`
  mutation deleteRecipientAddress($input: DeleteRecipientAddressInput!) {
    deleteRecipientAddress(input: $input) {
      status
    }
  }
`;

export const useDeleteRecipientAddressGetCache = gql`
  query useDeleteRecipientAddressGetCache {
    viewer {
      id
      shippableRecipientAddresses {
        id
      }
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
