// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback, useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useAddToCartFragment as useAddToCartFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  adTracks: useAddToCartFragmentType | null,
  fbq: NonNullable<typeof window.fbq>,
): AdTrackType['addToCart'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ eventName, id, title, quantity, specs, price }) => {
      if (!adTracks) return;

      const { googleAnalyticsId } = adTracks;
      const { event, type, label } = (() => {
        switch (eventName) {
          case 'ec-popup':
            return {
              event: 'trackCustom',
              type: 'AddToCart_PopUp',
              label: 'popup',
            };
          case 'upselling':
            return {
              event: 'trackCustom',
              type: 'AddToCart_AdditionalPurchase',
              label: 'AdditionalPurchase',
            };
          default:
            return { event: 'track', type: 'AddToCart', label: 'general' };
        }
      })();

      fbq(event, type, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_ids: [id],
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'product',
        value: price,
        currency,
      });

      if (window.gtag && googleAnalyticsId) {
        window.gtag('event', 'add_to_cart', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          event_label: label,
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
      }
    },
    [adTracks, fbq, currency],
  );
};
