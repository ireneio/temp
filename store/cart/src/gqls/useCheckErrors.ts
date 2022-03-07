// import
import { gql } from '@apollo/client';

// definition
export const useCheckErrorsFragment = gql`
  fragment useCheckErrorsFragment on LineItem {
    id
    quantity
    type
    status
  }
`;
