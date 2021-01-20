// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback, useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useBeginCheckoutFragment as useBeginCheckoutFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
type productsType = Parameters<AdTrackType['beginCheckout']>[0]['products'];

// definition
export default (
  adTracks: useBeginCheckoutFragmentType | null,
): AdTrackType['beginCheckout'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ products, total }) => {
      if (!adTracks) return;

      const {
        facebookPixelId,
        googleAnalyticsId,
        googleAdwordsConfig,
        googleAdwordsBeginCheckout,
      } = adTracks;

      if (window.fbq && facebookPixelId)
        window.fbq('track', 'InitiateCheckout', {
          value: total,
          currency,
        });

      if (window.gtag && googleAnalyticsId)
        window.gtag('event', 'begin_checkout', {
          items: products
            .filter(({ type }: productsType[number]) => type === 'product')
            .map(
              ({
                id,
                title,
                specs,
                totalPrice,
                quantity,
              }: productsType[number]) => ({
                id,
                name: title.zh_TW,
                variant: (specs || [])
                  .map(
                    ({ title: specTitle }: { title: { zh_TW: string } }) =>
                      specTitle.zh_TW,
                  )
                  .join('/'),
                price: totalPrice,
                quantity,
              }),
            ),
          value: total,
        });

      if (window.gtag && googleAdwordsConfig && googleAdwordsBeginCheckout)
        window.gtag('event', 'conversion', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          send_to: googleAdwordsBeginCheckout,
        });
    },
    [adTracks, currency],
  );
};
