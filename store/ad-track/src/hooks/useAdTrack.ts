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
) =>
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
