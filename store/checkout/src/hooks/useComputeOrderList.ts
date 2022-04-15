// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback, useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import {
  computeOrderList as computeOrderListType,
  computeOrderListVariables as computeOrderListVariablesType,
  computeOrderList_computeOrderList as computeOrderListComputeOrderListType,
  productChangeObjectType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computeOrderList } from '../gqls/useComputeOrderList';

// typescript definition
export type ReturnType = {
  computeOrderListLoading: boolean;
  computeOrderListData: computeOrderListComputeOrderListType | null;
  computeOrderList: ({
    products,
    paymentId,
    coupon,
    points,
  }: {
    products?: {
      productId?: string;
      variantId?: string;
      quantity?: number | null;
    }[];
    paymentId?: string;
    coupon?: string;
    points?: number;
  }) => void;
};

// definition
export default ({ getFieldValue }: FormInstance): ReturnType => {
  const adTrack = useContext(AdTrackContext);
  const [isAdTracked, setIsAdTracked] = useState<boolean>(false);
  const [mutation, { loading, data }] = useMutation<
    computeOrderListType,
    computeOrderListVariablesType
  >(computeOrderList);

  const computeOrderListData = data?.computeOrderList?.[0] || null;

  useEffect(() => {
    if (isAdTracked) return;

    if (
      computeOrderListData?.priceInfo?.total &&
      computeOrderListData?.categories?.[0]?.products
    ) {
      setIsAdTracked(true);

      adTrack.beginCheckout({
        products: computeOrderListData.categories[0].products.map(product => ({
          id: product?.productId || '',
          type: product?.type || '',
          title: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            zh_TW: product?.title?.zh_TW || '',
          },
          specs: (product?.specs || []).map(spec => ({
            title: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              zh_TW: spec?.title?.zh_TW || '',
            },
          })),
          totalPrice: product?.retailPrice || 0,
          quantity: product?.quantity || 0,
        })),
        total: computeOrderListData.priceInfo.total,
      });
    }
  }, [computeOrderListData, adTrack, isAdTracked]);

  return {
    computeOrderListLoading: loading,
    computeOrderListData,
    computeOrderList: useCallback(
      value => {
        const products = (value.products ||
          (computeOrderListData?.categories?.[0]?.products || []).filter(
            product => product?.type !== 'gift',
          )) as productChangeObjectType[];
        const paymentId = value.paymentId || getFieldValue(['paymentId']);
        const coupon = value.coupon || getFieldValue(['coupon']);
        const points = value.points || getFieldValue(['points']);

        mutation({
          variables: {
            computeOrderList: [
              {
                computeType: 'cart',
                products: products.map(
                  ({ productId, variantId, quantity }) => ({
                    productId,
                    ...(!variantId ? {} : { variantId }),
                    ...(!quantity ? {} : { quantity }),
                  }),
                ),
                ...(!paymentId ? {} : { payments: [{ paymentId }] }),
                ...(!coupon ? {} : { coupon }),
                ...(!points ? {} : { points }),
              },
            ],
          },
        });
      },
      [mutation, computeOrderListData, getFieldValue],
    ),
  };
};
