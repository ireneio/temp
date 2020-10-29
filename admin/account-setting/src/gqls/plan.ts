// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

// definition
export const planFragment = gql`
  fragment planFragment on User {
    store {
      id
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
