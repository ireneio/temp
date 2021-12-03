// import
import { gql } from '@apollo/client';

// definition
export const useUpdateGoogleSearchConsoleVerificationHtmlFragment = gql`
  fragment useUpdateGoogleSearchConsoleVerificationHtmlFragment on Store {
    id
    adTracks {
      googleSearchConsoleVerificationHtml
    }
  }
`;

export const updateGoogleSearchConsoleVerificationHtml = gql`
  mutation updateGoogleSearchConsoleVerificationHtml($input: String) {
    setGoogleSearchConsoleVerificationHtml(input: $input) {
      status
    }
  }
`;
