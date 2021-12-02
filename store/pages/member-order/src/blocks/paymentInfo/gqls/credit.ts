// import
import { gql } from '@apollo/client';

// definition
export const creditFragment = gql`
  fragment creditFragment on paymentInfoType {
    id
    list {
      id
      card4no
    }
  }
`;
