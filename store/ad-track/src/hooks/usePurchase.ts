// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

import { useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { usePurchaseFragment as usePurchaseFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
type productsType = Parameters<AdTrackType['purchase']>[0]['products'];

// definition
export default (
  store: usePurchaseFragmentType | null,
  fbq: NonNullable<typeof window.fbq>,
): AdTrackType['purchase'] => {
  const getLanguage = useGetLanguage();

  return useCallback(
    ({ orderNo, products, total, currency, shipmentFee, paymentFee }) => {
      if (!store) return;

      const {
        cname,
        adTracks: {
          googleAnalyticsId,
          googleAdwordsConfig,
          googleAdwordsPurchase,
        },
      } = store;

      fbq('track', 'Purchase', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_ids: products.map(({ productId }) => productId),
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'product',
        value: total,
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
            ?.filter(
              (product: productsType[number]) => product?.type === 'product',
            )
            .reduce(
              (
                result: productsType,
                { productId, title, specs, totalPrice, quantity },
              ) => {
                const product = result.find(({ id }) => id === productId);
                if (!product)
                  return [
                    ...result,
                    {
                      id: productId,
                      name: getLanguage(title),
                      variant: specs
                        ?.map(spec => getLanguage(spec?.title))
                        .join('/'),
                      price: totalPrice / quantity,
                      quantity,
                    },
                  ];
                // FIXME: fix for 選選樂
                product.quantity += quantity || 0;
                return result;
              },
              [],
            ),
        });

      if (window.gtag && googleAdwordsConfig && googleAdwordsPurchase)
        window.gtag('event', 'conversion', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          send_to: googleAdwordsPurchase,
        });
    },
    [store, fbq, getLanguage],
  );
};
