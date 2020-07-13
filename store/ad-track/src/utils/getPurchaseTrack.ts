// typescript import
import { AdTrackType } from '@meepshop/context/lib/adTrack';

import useAdTrackIds from '../hooks/useAdTrackIds';

// graphql typescript
import { getAdTrack_viewer_store as getAdTrackViewerStore } from '../__generated__/getAdTrack';

// typescript definition
type productsType = Parameters<AdTrackType['purchase']>[0]['products'];

// definition
export default ({
  cname,
  fbPixelId,
  gaId,
  googleAdsCompleteOrderId,
}: ReturnType<typeof useAdTrackIds> & {
  cname: getAdTrackViewerStore['cname'];
}) => ({
  orderNo,
  products,
  total,
  currency,
  shipmentFee,
  paymentFee,
}: Parameters<AdTrackType['purchase']>[0]) => {
  if (window.fbq && fbPixelId)
    window.fbq('track', 'Purchase', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      content_ids: products.map(({ productId }) => productId),
      // eslint-disable-next-line @typescript-eslint/camelcase
      content_type: 'product',
      value: total, // fb pixel record total of order different from GA EC
      currency,
    });

  if (window.gtag && gaId)
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

  if (window.gtag && googleAdsCompleteOrderId)
    window.gtag('event', 'conversion', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      send_to: googleAdsCompleteOrderId,
    });
};
