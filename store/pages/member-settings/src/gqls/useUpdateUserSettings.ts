// import
import { gql } from '@apollo/client';

// definition
export const updateUser = gql`
  mutation updateUser($input: UpdateShopperInfoInput!) {
    updateShopperInformation(input: $input) {
      status
    }
  }
`;

export const useUpdateUserSettingsFragment = gql`
  fragment useUpdateUserSettingsFragment on User {
    id
    name
    gender
    tel
    mobile
    birthday {
      year
      month
      day
    }
    address {
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
    notification {
      newsletters {
        cancelEmail
      }
      rewardPointReminderSubscription {
        cancelEmail
      }
    }
  }
`;
