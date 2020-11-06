// import
import gql from 'graphql-tag';

// definition
export const googleWebmasterFragment = gql`
  fragment googleWebmasterFragment on Store {
    id
    adTracks {
      googleSearchConsoleVerificationHtml
    }
  }
`;
