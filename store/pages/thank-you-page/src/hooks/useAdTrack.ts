// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useEffect, useContext, useRef } from 'react';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { useAdTrackFragment as useAdTrackFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
type productsType = Parameters<AdTrackType['purchase']>[0]['products'];

// definition
export default (order: useAdTrackFragmentType | null): void => {
  const { pathname } = useRouter();
  const triggeredRef = useRef<boolean>(false);
  const adTrack = useContext(AdTrackContext);

  useEffect(() => {
    // FIXME: landing-page issue
    if (!/^\/landing-page/.test(pathname) && order && !triggeredRef.current) {
      // SHOULD_NOT_BE_NULL
      adTrack.purchase({
        orderNo: order.orderNo || '',
        products: order.products as productsType,
        total: order.priceInfo?.total || 0,
        currency: order.priceInfo?.currency || 'TWD',
        shipmentFee: order.priceInfo?.shipmentFee || 0,
        paymentFee: order.priceInfo?.paymentFee || 0,
      });

      triggeredRef.current = true;
    }
  }, [order, adTrack, pathname]);
};
