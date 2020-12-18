// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// graphql typescript
import { useCompleteRegistrationFragment as useCompleteRegistrationFragmentType } from '../gqls/__generated__/useCompleteRegistrationFragment';

// definition
export default (
  adTracks: useCompleteRegistrationFragmentType | null,
): AdTrackType['completeRegistration'] =>
  useCallback(() => {
    if (!adTracks) return;

    const {
      facebookPixelId,
      googleAdwordsConfig,
      googleAdwordsSignUp,
    } = adTracks;

    if (window.fbq && facebookPixelId)
      window.fbq('track', 'CompleteRegistration');

    if (window.gtag && googleAdwordsConfig && googleAdwordsSignUp)
      window.gtag('event', 'conversion', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        send_to: googleAdwordsSignUp,
      });
  }, [adTracks]);
