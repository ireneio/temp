// import
import { gql } from '@apollo/client';

// definition
export const tagFragment = gql`
  fragment tagFragment on AffiliateProgram {
    id
    startAt
    endAt
  }
`;
