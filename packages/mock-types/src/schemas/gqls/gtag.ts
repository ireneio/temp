// import
import { gql } from '@apollo/client';

// definition
export const gtagMockFragment = gql`
  fragment gtagMockFragment on gtag {
    type
    eventName
    code
  }
`;
