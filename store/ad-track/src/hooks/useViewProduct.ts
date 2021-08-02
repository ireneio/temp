// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback, useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useViewProductFragment as useViewProductFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  adTracks: useViewProductFragmentType | null,
  fbq: NonNullable<typeof window.fbq>,
): AdTrackType['viewProduct'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ id, title, price }) => {
      if (!adTracks) return;

      const { googleAnalyticsId } = adTracks;

      fbq('track', 'ViewContent', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_ids: [id],
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'product',
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_name: title.zh_TW,
        value: price,
        currency,
      });

      if (window.gtag && googleAnalyticsId)
        window.gtag('event', 'view_item', {
          items: [
            {
              id,
              name: title.zh_TW,
              price,
            },
          ],
        });
    },
    [adTracks, fbq, currency],
  );
};
