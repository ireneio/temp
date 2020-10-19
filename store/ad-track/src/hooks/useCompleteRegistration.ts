// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';

// graphql typescript
import { useCompleteRegistrationFragment as useCompleteRegistrationFragmentType } from './__generated__/useCompleteRegistrationFragment';

// definition
export const useCompleteRegistrationFragment = gql`
  fragment useCompleteRegistrationFragment on StoreAdTrack {
    facebookPixelId
    googleAdwordsConfig
    googleAdwordsSignUp
  }
`;

export default (
  adTrack: useCompleteRegistrationFragmentType | null,
): AdTrackType['completeRegistration'] =>
  useCallback(() => {
    if (!adTrack) return;

    const {
      facebookPixelId,
      googleAdwordsConfig,
      googleAdwordsSignUp,
    } = adTrack;

    if (window.fbq && facebookPixelId)
      window.fbq('track', 'CompleteRegistration');

    if (window.gtag && googleAdwordsConfig && googleAdwordsSignUp)
      window.gtag('event', 'conversion', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        send_to: googleAdwordsSignUp,
      });
  }, [adTrack]);
