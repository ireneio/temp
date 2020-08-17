// typescript import
import { AdTrackType } from '@meepshop/context/lib/AdTrack';

// import
import { useEffect, useContext } from 'react';
import gql from 'graphql-tag';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import { useAdTrackFragment as useAdTrackFragmentType } from './__generated__/useAdTrackFragment';

// typescript definition
type productsType = Parameters<AdTrackType['purchase']>[0]['products'];

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

export default (order: useAdTrackFragmentType | null | undefined): void => {
  const adTrack = useContext(AdTrackContext);

  useEffect(() => {
    if (order)
      adTrack.purchase({
        orderNo: order.orderNo || '', // FIXME: should not be null
        products: (order.products || []).reduce(
          // FIXME: should not be null
          (result: productsType, data) => {
            if (!data) return result;

            const product = result.find(
              ({ productId }) => productId === data.productId,
            );

            if (!product) return [...result, data as productsType[number]];

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
