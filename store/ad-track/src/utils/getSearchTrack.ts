// typescript import
import { AdTrackType } from '@meepshop/context/lib/adTrack';

import useAdTrackIds from '../hooks/useAdTrackIds';

// definition
export default ({ fbPixelId, gaId }: ReturnType<typeof useAdTrackIds>) => ({
  searchString,
  products,
}: Parameters<AdTrackType['search']>[0]) => {
  if (window.fbq && fbPixelId)
    // eslint-disable-next-line @typescript-eslint/camelcase
    window.fbq('track', 'Search', { search_string: searchString });

  if (window.gtag && gaId && products)
    window.gtag('event', 'view_item_list', {
      items: products.map(({ id, title }) => ({
        id,
        name: title.zh_TW,
        // eslint-disable-next-line @typescript-eslint/camelcase
        list_name: searchString,
      })),
    });
};
