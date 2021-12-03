// import
import { gql } from '@apollo/client';

// definition
export const paymentInfoTypeMockFragment = gql`
  fragment paymentInfoTypeMockFragment on paymentInfoType {
    status
  }
`;
