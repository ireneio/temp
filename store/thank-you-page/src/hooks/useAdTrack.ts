// typescript import
import { OptionType } from '@store/ad-track/lib/utils/getPurchaseTrack';

// import
import { useEffect, useContext } from 'react';
import gql from 'graphql-tag';

import adTrackContext from '@store/ad-track';

// graphql typescript
import { useAdTrackFragment as useAdTrackFragmentType } from './__generated__/useAdTrackFragment';

// definition
export const useAdTrackFragment = gql`
  fragment useAdTrackFragment on Order {
    id
    orderNo
    products {
      id
      productId
      type
      sku
      title {
        zh_TW
      }
      specs {
        title {
          zh_TW
        }
      }
      totalPrice
      quantity
    }

    priceInfo {
      total
      shipmentFee
      paymentFee
      currency
    }
  }
`;

export default (order: useAdTrackFragmentType): void => {
  const { adTrack } = useContext(adTrackContext);

  useEffect(() => {
    if (order)
      adTrack.purchase({
        orderNo: order.orderNo || '', // FIXME: should not be null
        products: (order.products || []).reduce(
          // FIXME: should not be null
          (result: OptionType['products'], data) => {
            if (!data) return result;

            const product = result.find(
              ({ productId }) => productId === data.productId,
            );

            if (!product)
              return [...result, data as OptionType['products'][number]];

            product.quantity += data.quantity || 0;

            return result;
          },
          [],
        ),
        total: order.priceInfo?.total || 0, // FIXME: should not be null
        currency: order.priceInfo?.currency || 'TWD', // FIXME: should not be null
        shipmentFee: order.priceInfo?.shipmentFee || 0, // FIXME: should not be null
        paymentFee: order.priceInfo?.paymentFee || 0, // FIXME: should not be null
      });
  }, [order, adTrack]);
};
