// typescript import
import { CurrencyType } from '@store/currency';

import useAdTrackIds from '../hooks/useAdTrackIds';

// typescript definition
interface OptionType {
  total: number;
}

// definition
export default ({
  fbPixelId,
  gaId,
  googleAdsConversionID,
  googleAdsCheckoutLabel,
  currency,
}: ReturnType<typeof useAdTrackIds> & {
  currency: CurrencyType['currency'];
}) => ({ total }: OptionType) => {
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
