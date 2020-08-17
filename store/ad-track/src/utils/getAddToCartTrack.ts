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
}) => ({
  eventName,
  id,
  title,
  quantity,
  sku,
  specs,
  price,
}: Parameters<AdTrackType['addToCart']>[0]) => {
  if (window.fbq && fbPixelId)
    window.fbq(
      eventName === 'ec-popup' ? 'trackCustom' : 'track',
      eventName === 'ec-popup' ? 'AddToCart_PopUp' : 'AddToCart',
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_ids: [id],
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'product',
        value: price,
        currency,
      },
    );

  if (window.gtag && gaId)
    window.gtag('event', 'add_to_cart', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      event_label: eventName === 'ec-popup' ? 'popup' : 'general',
      items: [
        {
          id: sku,
          name: title.zh_TW,
          variant: !specs
            ? ''
            : specs.map(({ title: specTitle }) => specTitle.zh_TW).join('/'),
          quantity,
          price,
        },
      ],
    });
};
