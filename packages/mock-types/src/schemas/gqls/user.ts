// import
import { gql } from '@apollo/client';

// definition
export const userMockFragment = gql`
  fragment userMockFragment on User {
    role
    order(orderId: "test") {
      id
    }
    groupId
    name
    email
    gender
    additionalInfo {
      tel
      mobile
    }
    birthday {
      year
      month
      day
    }
  }
`;
