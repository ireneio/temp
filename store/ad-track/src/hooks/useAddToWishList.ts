// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// definition
export default (fbq: typeof window.fbq): AdTrackType['addToWishList'] =>
  useCallback(() => {
    fbq('track', 'AddToWishList');
  }, [fbq]);
