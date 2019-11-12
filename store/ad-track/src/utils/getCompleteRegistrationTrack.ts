// typescript import
import useAdTrackIds from '../hooks/useAdTrackIds';

// definition
export default ({
  fbPixelId,
  googleAdsConversionID,
  googleAdsSignupLabel,
}: ReturnType<typeof useAdTrackIds>) => () => {
  if (window.fbq && fbPixelId) window.fbq('track', 'CompleteRegistration');

  if (window.gtag && googleAdsConversionID && googleAdsSignupLabel)
    window.gtag('event', 'conversion', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      send_to: googleAdsSignupLabel,
    });
};
