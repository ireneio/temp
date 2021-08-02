// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// graphql typescript
import { useCompleteRegistrationFragment as useCompleteRegistrationFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  adTracks: useCompleteRegistrationFragmentType | null,
  fbq: NonNullable<typeof window.fbq>,
): AdTrackType['completeRegistration'] =>
  useCallback(() => {
    if (!adTracks) return;

    const { googleAdwordsConfig, googleAdwordsSignUp } = adTracks;

    fbq('track', 'CompleteRegistration');

    if (window.gtag && googleAdwordsConfig && googleAdwordsSignUp)
      window.gtag('event', 'conversion', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        send_to: googleAdwordsSignUp,
      });
  }, [adTracks, fbq]);
