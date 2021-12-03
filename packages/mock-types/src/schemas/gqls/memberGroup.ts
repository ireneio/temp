// import
import { gql } from '@apollo/client';

// definition
export const memberGroupMockFragment = gql`
  fragment memberGroupMockFragment on MemberGroup {
    id
    name
    type
  }
`;
