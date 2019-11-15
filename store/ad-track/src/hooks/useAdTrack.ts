// typescript import
import { CurrencyType } from '@store/currency';

import useAdTrackIds from './useAdTrackIds';

// import
import { useMemo } from 'react';

import getAddToCartTrack from '../utils/getAddToCartTrack';
import getViewProductTrack from '../utils/getViewProductTrack';
import getSearchTrack from '../utils/getSearchTrack';
import getAddToWishListTrack from '../utils/getAddToWishListTrack';
import getCompleteRegistrationTrack from '../utils/getCompleteRegistrationTrack';
import getBeginCheckoutTrack from '../utils/getBeginCheckoutTrack';
import getPurchaseTrack from '../utils/getPurchaseTrack';

// graphql typescript
import { getAdTrack_viewer_store as getAdTrackViewerStore } from '../__generated__/getAdTrack';

// definition
export default (
  data: ReturnType<typeof useAdTrackIds> & {
    cname: getAdTrackViewerStore['cname'];
    currency: CurrencyType['currency'];
  },
): {
  addToCart: ReturnType<typeof getAddToCartTrack>;
  viewProduct: ReturnType<typeof getViewProductTrack>;
  search: ReturnType<typeof getSearchTrack>;
  addToWishList: ReturnType<typeof getAddToWishListTrack>;
  completeRegistration: ReturnType<typeof getCompleteRegistrationTrack>;
  beginCheckout: ReturnType<typeof getBeginCheckoutTrack>;
  purchase: ReturnType<typeof getPurchaseTrack>;
} =>
  useMemo(
    () => ({
      addToCart: getAddToCartTrack(data),
      viewProduct: getViewProductTrack(data),
      search: getSearchTrack(data),
      addToWishList: getAddToWishListTrack(data),
      completeRegistration: getCompleteRegistrationTrack(data),
      beginCheckout: getBeginCheckoutTrack(data),
      purchase: getPurchaseTrack(data),
    }),
    [data],
  );
