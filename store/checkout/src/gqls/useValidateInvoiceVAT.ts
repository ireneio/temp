// import
import { gql } from '@apollo/client';

// definition
export const isBANValid = gql`
  query isBANValid($ban: String!) {
    isBANValid(ban: $ban)
  }
`;
