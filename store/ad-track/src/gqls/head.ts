// import
import gql from 'graphql-tag';

// definition
export const headFragment = gql`
  fragment headFragment on AdTracks {
    googleSearchConsoleVerificationHtml
    facebookPixelId
    googleAnalyticsId
    googleAdwordsConfig
    googleTagManager
  }
`;