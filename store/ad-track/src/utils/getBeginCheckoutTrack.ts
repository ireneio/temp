// typescript import
import { AdTrackType } from '@meepshop/context/lib/adTrack';
import { CurrencyType } from '@store/currency';

import useAdTrackIds from '../hooks/useAdTrackIds';

// definition
export default ({
  fbPixelId,
  gaId,
  googleAdsConversionID,
  googleAdsCheckoutLabel,
  currency,
}: ReturnType<typeof useAdTrackIds> & {
  currency: CurrencyType['currency'];
}) => ({ total }: Parameters<AdTrackType['beginCheckout']>[0]) => {
  if (window.fbq && fbPixelId)
    window.fbq('track', 'InitiateCheckout', {
      value: total,
      currency,
    });

  if (window.gtag && gaId)
    window.gtag('event', 'set_checkout_option', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      checkout_step: 1,
      // eslint-disable-next-line @typescript-eslint/camelcase
      checkout_option: 'visa',
      value: total,
    });

  if (window.gtag && googleAdsConversionID && googleAdsCheckoutLabel)
    window.gtag('event', 'conversion', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      send_to: googleAdsCheckoutLabel,
    });
};
