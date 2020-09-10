// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback, useContext } from 'react';
import gql from 'graphql-tag';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useAddToCartFragment as useAddToCartFragmentType } from './__generated__/useAddToCartFragment';

// definition
export const useAddToCartFragment = gql`
  fragment useAddToCartFragment on StoreAdTrack {
    facebookPixelId
    googleAnalyticsId
  }
`;

export default (
  adTrack: useAddToCartFragmentType | null,
): AdTrackType['addToCart'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ eventName, id, title, quantity, specs, price }) => {
      if (!adTrack) return;

      const { facebookPixelId, googleAnalyticsId } = adTrack;

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
                    .map(({ title: specTitle }) => specTitle.zh_TW)
                    .join('/'),
              quantity,
              price,
            },
          ],
        });
    },
    [adTrack, currency],
  );
};
