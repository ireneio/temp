// import
import gql from 'graphql-tag';

// definition
export const updateRecipientAddress = gql`
  mutation updateRecipientAddress($input: UpdateRecipientAddressInput!) {
    updateRecipientAddress(input: $input) {
      status
    }
  }
`;

export const useUpdateRecipientAddressFragment = gql`
  fragment useUpdateRecipientAddressFragment on RecipientAddress {
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
`;
