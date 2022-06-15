// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

import { useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { useSearchFragment as useSearchFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  adTracks: useSearchFragmentType | null,
  fbq: NonNullable<typeof window.fbq>,
): AdTrackType['search'] => {
  const getLanguage = useGetLanguage();

  return useCallback(
    ({ searchString, products }) => {
      if (!adTracks) return;

      const { googleAnalyticsId } = adTracks;

      // eslint-disable-next-line @typescript-eslint/camelcase
      fbq('track', 'Search', { search_string: searchString });

      if (window.gtag && googleAnalyticsId && products)
        window.gtag('event', 'view_item_list', {
          items: products.map(({ id, title }) => ({
            id,
            name: getLanguage(title),
            // eslint-disable-next-line @typescript-eslint/camelcase
            list_name: searchString,
          })),
        });
    },
    [adTracks, fbq, getLanguage],
  );
};
