// import
import { gql } from '@apollo/client';

// definition
export const googleWebmasterFragment = gql`
  fragment googleWebmasterFragment on Store {
    id
    adTracks {
      googleSearchConsoleVerificationHtml
    }
  }
`;
