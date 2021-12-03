// import
import { gql } from '@apollo/client';

// definition
export const useCheckingAdminStatusFragment = gql`
  fragment useCheckingAdminStatusFragment on Store {
    adminStatus
  }
`;
