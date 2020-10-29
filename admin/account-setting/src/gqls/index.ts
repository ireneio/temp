// import
import gql from 'graphql-tag';

// graphql import
import { accountFragment } from './account';
import { planFragment } from './plan';

// definition
export const getMerchantAccount = gql`
  query getMerchantAccount {
    viewer {
      id
      ...accountFragment
      ...planFragment
    }
  }

  ${accountFragment}
  ${planFragment}
`;
