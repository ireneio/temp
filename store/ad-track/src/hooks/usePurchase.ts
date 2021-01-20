// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// graphql typescript
import { usePurchaseFragment as usePurchaseFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
type productsType = Parameters<AdTrackType['purchase']>[0]['products'];

// definition
export default (
  store: usePurchaseFragmentType | null,
): AdTrackType['purchase'] =>
  useCallback(
    ({ orderNo, products, total, currency, shipmentFee, paymentFee }) => {
      if (!store) return;

      const {
        cname,
        adTracks: {
          facebookPixelId,
          googleAnalyticsId,
          googleAdwordsConfig,
          googleAdwordsPurchase,
        },
      } = store;

      if (window.fbq && facebookPixelId)
        window.fbq('track', 'Purchase', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_ids: products.map(({ productId }) => productId),
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_type: 'product',
          value: total, // fb pixel record total of order different from GA EC
          currency,
        });

      if (window.gtag && googleAnalyticsId)
        window.gtag('event', 'purchase', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          transaction_id: orderNo,
          affiliation: cname,
          value: total - shipmentFee - paymentFee,
          shipping: shipmentFee,
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
        });

      if (window.gtag && googleAdwordsConfig && googleAdwordsPurchase)
        window.gtag('event', 'conversion', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          send_to: googleAdwordsPurchase,
        });
    },
    [store],
  );
