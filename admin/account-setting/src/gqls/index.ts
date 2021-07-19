// import
import gql from 'graphql-tag';

// graphql import
import { useInitialValuesUserFragment } from './useInitialValues';
import { accountFragment } from './account';
import { planFragment } from './plan';

// definition
export const getMerchantAccount = gql`
  query getMerchantAccount {
    viewer {
      id
      ...useInitialValuesUserFragment
      ...accountFragment
      ...planFragment
    }
  }

  ${useInitialValuesUserFragment}
  ${accountFragment}
  ${planFragment}
`;
