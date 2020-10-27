// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback, useContext } from 'react';
import gql from 'graphql-tag';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useBeginCheckoutFragment as useBeginCheckoutFragmentType } from './__generated__/useBeginCheckoutFragment';

// typescript definition
type productsType = Parameters<AdTrackType['beginCheckout']>[0]['products'];

// definition
export const useBeginCheckoutFragment = gql`
  fragment useBeginCheckoutFragment on StoreAdTrack {
    facebookPixelId
    googleAnalyticsId
    googleAdwordsConfig
    googleAdwordsBeginCheckout
  }
`;

export default (
  adTrack: useBeginCheckoutFragmentType | null,
): AdTrackType['beginCheckout'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ products, total }) => {
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
    [adTrack, currency],
  );
};
