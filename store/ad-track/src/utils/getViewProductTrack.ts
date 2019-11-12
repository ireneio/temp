// typescript import
import useAdTrackIds from '../hooks/useAdTrackIds';

// typescript definition
interface OptionType {
  id: string;
  title: {
    zh_TW: string;
  };
}

// definition
export default ({ fbPixelId, gaId }: ReturnType<typeof useAdTrackIds>) => ({
  id,
  title,
}: OptionType) => {
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
