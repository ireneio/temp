// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// graphql typescript
import { useAddToWishListFragment as useAddToWishListFragmentType } from '../gqls/__generated__/useAddToWishListFragment';

// definition
export default (
  adTracks: useAddToWishListFragmentType | null,
): AdTrackType['addToWishList'] =>
  useCallback(() => {
    if (!adTracks) return;

    const { facebookPixelId } = adTracks;

    if (window.fbq && facebookPixelId) window.fbq('track', 'AddToWishList');
  }, [adTracks]);
