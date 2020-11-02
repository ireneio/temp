// import
import gql from 'graphql-tag';

// definition
export const gtagMockFragment = gql`
  fragment gtagMockFragment on gtag {
    type
    eventName
    code
  }
`;
