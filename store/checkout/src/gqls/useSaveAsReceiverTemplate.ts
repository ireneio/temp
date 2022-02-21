// import
import { gql } from '@apollo/client';

// definition
export const useSaveAsReceiverTemplateFragment = gql`
  fragment useSaveAsReceiverTemplateFragment on User {
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
      street
      zipCode
    }
  }
`;
