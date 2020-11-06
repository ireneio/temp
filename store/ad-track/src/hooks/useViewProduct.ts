// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback, useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useViewProductFragment as useViewProductFragmentType } from '../gqls/__generated__/useViewProductFragment';

// definition
export default (
  adTracks: useViewProductFragmentType | null,
): AdTrackType['viewProduct'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ id, title, price }) => {
      if (!adTracks) return;

      const { facebookPixelId, googleAnalyticsId } = adTracks;

      if (window.fbq && facebookPixelId)
        window.fbq('track', 'ViewContent', {
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
    [adTracks, currency],
  );
};
