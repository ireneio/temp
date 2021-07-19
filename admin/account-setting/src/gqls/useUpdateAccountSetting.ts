// import
import gql from 'graphql-tag';

// graphql import
import { useInitialValuesUserFragment } from './useInitialValues';

// definition
export const updateUserList = gql`
  mutation updateUserList($updateUserList: [UpdateUser]) {
    updateUserList(updateUserList: $updateUserList) {
      id
      ...useInitialValuesUserFragment
    }
  }

  ${useInitialValuesUserFragment}
`;
