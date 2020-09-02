// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';

// graphql typescript
import { useSearchFragment as useSearchFragmentType } from './__generated__/useSearchFragment';

// definition
export const useSearchFragment = gql`
  fragment useSearchFragment on StoreAdTrack {
    facebookPixelId
    googleAnalyticsId
  }
`;

export default (adTrack: useSearchFragmentType | null): AdTrackType['search'] =>
  useCallback(
    ({ searchString, products }) => {
      if (!adTrack) return;

      const { facebookPixelId, googleAnalyticsId } = adTrack;

      if (window.fbq && facebookPixelId)
        // eslint-disable-next-line @typescript-eslint/camelcase
        window.fbq('track', 'Search', { search_string: searchString });

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
    [adTrack],
  );
