// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// graphql typescript
import { useSearchFragment as useSearchFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  adTracks: useSearchFragmentType | null,
  fbq: typeof window.fbq,
): AdTrackType['search'] =>
  useCallback(
    ({ searchString, products }) => {
      if (!adTracks) return;

      const { googleAnalyticsId } = adTracks;

      // eslint-disable-next-line @typescript-eslint/camelcase
      fbq('track', 'Search', { search_string: searchString });

      if (window.gtag && googleAnalyticsId && products)
        window.gtag('event', 'view_item_list', {
          items: products.map(({ id, title }) => ({
            id,
            name: title.zh_TW,
            // eslint-disable-next-line @typescript-eslint/camelcase
            list_name: searchString,
          })),
        });
    },
    [adTracks, fbq],
  );
