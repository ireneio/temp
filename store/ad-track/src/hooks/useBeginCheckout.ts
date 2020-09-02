// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback, useContext } from 'react';
import gql from 'graphql-tag';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useBeginCheckoutFragment as useBeginCheckoutFragmentType } from './__generated__/useBeginCheckoutFragment';

// definition
export const useBeginCheckoutFragment = gql`
  fragment useBeginCheckoutFragment on StoreAdTrack {
    facebookPixelId
    googleAnalyticsId
    googleAdwordsConfig {
      extractedId
    }
    googleAdwordsBeginCheckout {
      extractedId
    }
  }
`;

export default (
  adTrack: useBeginCheckoutFragmentType | null,
): AdTrackType['beginCheckout'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ total }) => {
      if (!adTrack) return;

      const {
        facebookPixelId,
        googleAnalyticsId,
        googleAdwordsConfig,
        googleAdwordsBeginCheckout,
      } = adTrack;

      if (window.fbq && facebookPixelId)
        window.fbq('track', 'InitiateCheckout', {
          value: total,
          currency,
        });

      if (window.gtag && googleAnalyticsId)
        window.gtag('event', 'set_checkout_option', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          checkout_step: 1,
          // eslint-disable-next-line @typescript-eslint/camelcase
          checkout_option: 'visa',
          value: total,
        });

      if (
        window.gtag &&
        googleAdwordsConfig.extractedId &&
        googleAdwordsBeginCheckout.extractedId
      )
        window.gtag('event', 'conversion', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          send_to: googleAdwordsBeginCheckout.extractedId,
        });
    },
    [adTrack, currency],
  );
};
