// import
import gql from 'graphql-tag';

// definition
export const memberGroupMockFragment = gql`
  fragment memberGroupMockFragment on MemberGroup {
    id
    name
    type
  }
`;
