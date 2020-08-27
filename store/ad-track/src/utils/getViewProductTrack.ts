// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';
import { CurrencyType } from '@meepshop/context/lib/Currency';

import useAdTrackIds from '../hooks/useAdTrackIds';

// definition
export default ({
  fbPixelId,
  gaId,
  currency,
}: ReturnType<typeof useAdTrackIds> & {
  currency: CurrencyType['currency'];
}) => ({ id, title, price }: Parameters<AdTrackType['viewProduct']>[0]) => {
  if (window.fbq && fbPixelId)
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

  if (window.gtag && gaId)
    window.gtag('event', 'view_item', {
      items: [
        {
          id,
          name: title.zh_TW,
          price,
        },
      ],
    });
};
