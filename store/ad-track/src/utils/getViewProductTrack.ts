// typescript import
import { AdTrackType } from '@meepshop/context/lib/adTrack';

import useAdTrackIds from '../hooks/useAdTrackIds';

// definition
export default ({ fbPixelId, gaId }: ReturnType<typeof useAdTrackIds>) => ({
  id,
  title,
}: Parameters<AdTrackType['viewProduct']>[0]) => {
  if (window.fbq && fbPixelId)
    window.fbq('track', 'ViewContent', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      content_ids: [id],
      // eslint-disable-next-line @typescript-eslint/camelcase
      content_type: 'product',
    });

  if (window.gtag && gaId)
    window.gtag('event', 'view_item', {
      items: [
        {
          id,
          name: title.zh_TW,
        },
      ],
    });
};
