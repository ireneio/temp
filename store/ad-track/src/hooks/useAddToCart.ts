// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback, useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useAddToCartFragment as useAddToCartFragmentType } from '../gqls/__generated__/useAddToCartFragment';

// definition
export default (
  adTracks: useAddToCartFragmentType | null,
): AdTrackType['addToCart'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ eventName, id, title, quantity, specs, price }) => {
      if (!adTracks) return;

      const { facebookPixelId, googleAnalyticsId } = adTracks;

      if (window.fbq && facebookPixelId)
        window.fbq(
          eventName === 'ec-popup' ? 'trackCustom' : 'track',
          eventName === 'ec-popup' ? 'AddToCart_PopUp' : 'AddToCart',
          {
            // eslint-disable-next-line @typescript-eslint/camelcase
            content_ids: [id],
            // eslint-disable-next-line @typescript-eslint/camelcase
            content_type: 'product',
            value: price,
            currency,
          },
        );

      if (window.gtag && googleAnalyticsId)
        window.gtag('event', 'add_to_cart', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          event_label: eventName === 'ec-popup' ? 'popup' : 'general',
          items: [
            {
              id,
              name: title.zh_TW,
              variant: !specs
                ? ''
                : specs
                    .map(spec => spec?.title?.zh_TW)
                    .filter(Boolean)
                    .join('/'),
              quantity,
              price,
            },
          ],
        });
    },
    [adTracks, currency],
  );
};
