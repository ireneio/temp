// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useEffect, useContext } from 'react';
import gql from 'graphql-tag';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import { useAdTrackFragment as useAdTrackFragmentType } from '@meepshop/types/gqls/store';

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

export default (order: useAdTrackFragmentType | null): void => {
  const adTrack = useContext(AdTrackContext);

  useEffect(() => {
    if (order)
      adTrack.purchase({
        orderNo: order.orderNo || '', // SHOULD_NOT_BE_NULL
        products: (order.products || []).reduce(
          // SHOULD_NOT_BE_NULL
          (result: productsType, data) => {
            if (!data) return result;

            const product = result.find(({ id }) => id === data.productId);

            if (!product)
              return [
                ...result,
                { ...data, id: data.productId } as productsType[number],
              ];

            product.quantity += data.quantity || 0;

            return result;
          },
          [],
        ),
        total: order.priceInfo?.total || 0, // SHOULD_NOT_BE_NULL
        currency: order.priceInfo?.currency || 'TWD', // SHOULD_NOT_BE_NULL
        shipmentFee: order.priceInfo?.shipmentFee || 0, // SHOULD_NOT_BE_NULL
        paymentFee: order.priceInfo?.paymentFee || 0, // SHOULD_NOT_BE_NULL
      });
  }, [order, adTrack]);
};
