// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';

// graphql typescript
import { useAddToWishListFragment as useAddToWishListFragmentType } from './__generated__/useAddToWishListFragment';

// definition
export const useAddToWishListFragment = gql`
  fragment useAddToWishListFragment on StoreAdTrack {
    facebookPixelId
  }
`;

export default (
  adTrack: useAddToWishListFragmentType | null,
): AdTrackType['addToWishList'] =>
  useCallback(() => {
    if (!adTrack) return;

    const { facebookPixelId } = adTrack;

    if (window.fbq && facebookPixelId) window.fbq('track', 'AddToWishList');
  }, [adTrack]);
