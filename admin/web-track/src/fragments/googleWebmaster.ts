// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment googleWebmasterFragment on Store {
    id
    adTrack @client {
      googleSearchConsoleVerificationHtmlId
      googleSearchConsoleVerificationHtml
    }
  }
`;
