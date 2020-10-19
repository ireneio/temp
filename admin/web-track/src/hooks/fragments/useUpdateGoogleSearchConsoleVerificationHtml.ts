// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment updateGoogleSearchConsoleVerificationHtmlCacheFragment on Store {
    id
    adTrack @client {
      googleSearchConsoleVerificationHtml
    }
  }
`;
