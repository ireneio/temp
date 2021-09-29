// import
import gql from 'graphql-tag';

// definition
export const addRecipientAddress = gql`
  mutation addRecipientAddress($input: AddRecipientAddressInput!) {
    addRecipientAddress(input: $input) {
      status
      recipientAddressId
    }
  }
`;

export const useAddRecipientAddressFragment = gql`
  fragment useAddRecipientAddressFragment on User {
    id
    shippableRecipientAddresses {
      id
      name
      mobile
      country {
        id
      }
      city {
        id
      }
      area {
        id
      }
      zipCode
      street
    }
  }
`;

export const useAddRecipientAddressGetCache = gql`
  query useAddRecipientAddressGetCache {
    viewer {
      id
      ...useAddRecipientAddressFragment
    }
  }

  ${useAddRecipientAddressFragment}
`;
