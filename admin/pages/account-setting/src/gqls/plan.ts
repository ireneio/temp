// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const planFragment = gql`
  fragment planFragment on User {
    store {
      id
      metaData {
        accountType
      }
      setting {
        billing {
          billingType
        }
      }
      plan {
        name {
          ...localeFragment
        }
      }
    }
  }

  ${localeFragment}
`;
