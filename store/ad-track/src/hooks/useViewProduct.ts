// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback, useContext } from 'react';
import gql from 'graphql-tag';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useViewProductFragment as useViewProductFragmentType } from './__generated__/useViewProductFragment';

// definition
export const useViewProductFragment = gql`
  fragment useViewProductFragment on StoreAdTrack {
    facebookPixelId
    googleAnalyticsId
  }
`;

export default (
  adTrack: useViewProductFragmentType | null,
): AdTrackType['viewProduct'] => {
  const { currency } = useContext(CurrencyContext);

  return useCallback(
    ({ id, title, price }) => {
      if (!adTrack) return;

      const { facebookPixelId, googleAnalyticsId } = adTrack;

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
    [adTrack, currency],
  );
};
