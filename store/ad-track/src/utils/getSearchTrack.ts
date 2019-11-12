// typescript import
import useAdTrackIds from '../hooks/useAdTrackIds';

// typescript definition
interface OptionType {
  searchString: string;
  products: {
    id: string;
    title: {
      zh_TW: string;
    };
  }[];
}

// definition
export default ({ fbPixelId, gaId }: ReturnType<typeof useAdTrackIds>) => ({
  searchString,
  products,
}: OptionType) => {
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
