// import
import { gql } from '@apollo/client';

// definition
export const useInitialValuesStoreBillingSettingFragment = gql`
  fragment useInitialValuesStoreBillingSettingFragment on StoreBillingSetting {
    invoice {
      accountType
      name
      email
      title
      ban
      addressV2 {
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

    payment {
      method
    }
  }
`;
