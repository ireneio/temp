// import
import { gql } from '@apollo/client';

// definition
export const headFragment = gql`
  fragment headFragment on AdTracks {
    googleSearchConsoleVerificationHtml
    googleMerchantCenterVerificationCode
    facebookPixelId
    googleAnalyticsId
    googleAdwordsConfig
    googleTagManager
  }
`;
