// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback } from 'react';

import gql from 'graphql-tag';

// graphql typescript
import { usePurchaseFragment as usePurchaseFragmentType } from './__generated__/usePurchaseFragment';

// typescript definition
type productsType = Parameters<AdTrackType['purchase']>[0]['products'];

// definition
export const usePurchaseFragment = gql`
  fragment usePurchaseFragment on Store {
    id
    cname
    adTrack @client {
      facebookPixelId
      googleAnalyticsId
      googleAdwordsConfig {
        extractedId
      }
      googleAdwordsPurchase {
        extractedId
      }
    }
  }
`;

export default (
  store: usePurchaseFragmentType | null,
): AdTrackType['purchase'] =>
  useCallback(
    ({ orderNo, products, total, currency, shipmentFee, paymentFee }) => {
      if (!store) return;

      const {
        cname,
        adTrack: {
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
                sku,
                title,
                specs,
                totalPrice,
                quantity,
              }: productsType[number]) => ({
                id: sku,
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

      if (
        window.gtag &&
        googleAdwordsConfig.extractedId &&
        googleAdwordsPurchase.extractedId
      )
        window.gtag('event', 'conversion', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          send_to: googleAdwordsPurchase.extractedId,
        });
    },
    [store],
  );