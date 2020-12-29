// import
import gql from 'graphql-tag';

// definition
export const useCheckingAdminStatusFragment = gql`
  fragment useCheckingAdminStatusFragment on Store {
    adminStatus
  }
`;
