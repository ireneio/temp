// typescript import
import { CurrencyType } from '@store/currency';

import useAdTrackIds from '../hooks/useAdTrackIds';

// graphql typescript
import { getAdTrack_viewer_store as getAdTrackViewerStore } from '../__generated__/getAdTrack';

// typescript definition
interface OptionType {
  eventName: 'ec-popup' | 'ec' | 'lp';
  id: string;
  title: {
    zh_TW: string;
  };
  quantity: number;
  sku: string;
  specs:
    | [
        {
          title: {
            zh_TW: string;
          };
        },
      ]
    | null;
  price: number;
}

// definition
export default ({
  cname,
  fbPixelId,
  gaId,
  currency,
}: ReturnType<typeof useAdTrackIds> & {
  cname: getAdTrackViewerStore['cname'];
  currency: CurrencyType['currency'];
}) => ({ eventName, id, title, quantity, sku, specs, price }: OptionType) => {
  if (window.fbq && fbPixelId) {
    // For: T3163
    if (
      ['beeding', 'bellatest'].includes(
        cname || '' /** TODO: should not be null */,
      ) &&
      ['ec-popup', 'ec'].includes(eventName)
    )
      window.fbq(
        'trackCustom',
        eventName === 'ec-popup' ? 'AddToCart_PopUp' : 'FKMK',
        {
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_ids: [id],
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_type: 'product',
          value: price,
          currency,
        },
      );

    if (eventName === 'ec-popup')
      window.fbq('trackCustom', 'AddToCart_PopUp', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_ids: [id],
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'product',
        value: price,
        currency,
      });
    else
      window.fbq('track', 'AddToCart', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_ids: [id],
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'product',
        value: price,
        currency,
      });
  }

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
