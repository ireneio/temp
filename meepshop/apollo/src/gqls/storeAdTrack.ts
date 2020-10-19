// import
import gql from 'graphql-tag';

// definition
export const storeAdTrackFbPixelFragment = gql`
  fragment storeAdTrackFbPixelFragment on FbPixel {
    pixelId
  }
`;

export const storeAdTrackGtagFragment = gql`
  fragment storeAdTrackGtagFragment on gtag {
    eventName
    trackingId
  }
`;

export const storeAdTrackWebTrackFragment = gql`
  fragment storeAdTrackWebTrackFragment on WebTrack {
    id
    trackType
    trackId
  }
`;
