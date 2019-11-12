// typescript import
import useAdTrackIds from '../hooks/useAdTrackIds';

// definition
export default ({ fbPixelId }: ReturnType<typeof useAdTrackIds>) => () => {
  if (window.fbq && fbPixelId) window.fbq('track', 'AddToWishList');
};
