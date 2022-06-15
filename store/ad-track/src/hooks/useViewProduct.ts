// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback, useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';
import { useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { useViewProductFragment as useViewProductFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  adTracks: useViewProductFragmentType | null,
  fbq: NonNullable<typeof window.fbq>,
): AdTrackType['viewProduct'] => {
  const { currency } = useContext(CurrencyContext);
  const getLanguage = useGetLanguage();

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
        content_name: getLanguage(title),
        value: price,
        currency,
      });

      if (window.gtag && googleAnalyticsId)
        window.gtag('event', 'view_item', {
          items: [
            {
              id,
              name: getLanguage(title),
              price,
            },
          ],
        });
    },
    [adTracks, fbq, currency, getLanguage],
  );
};
