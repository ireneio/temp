// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback, useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
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
export type ComputeOrderList = ({
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

interface ReturnType {
  computeOrderListLoading: boolean;
  computeOrderListData: computeOrderListComputeOrderListType | null;
  computeOrderList: ComputeOrderList;
}

// definition
export default ({ getFieldValue }: FormInstance): ReturnType => {
  const { t } = useTranslation('checkout');
  const { push } = useRouter();
  const adTrack = useContext(AdTrackContext);
  const [isAdTracked, setIsAdTracked] = useState(false);
  const [showError, setShowError] = useState(false);
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

  useEffect(() => {
    if (showError) return;

    if (
      computeOrderListData?.categories?.[0]?.products?.some(
        product => product?.type !== 'gift' && product?.error,
      )
    ) {
      setShowError(true);

      Modal.warning({
        title: t('products-error'),
        content: t('choose-products'),
        okText: t('go-back-to-cart'),
        onOk: () => push('/cart'),
      });
    }
  }, [computeOrderListData, t, push, showError]);

  return {
    computeOrderListLoading: loading,
    computeOrderListData,
    computeOrderList: useCallback(
      value => {
        if (!getFieldValue(['shipment'])?.id) return;

        const products = (value.products ||
          (computeOrderListData?.categories?.[0]?.products || []).filter(
            product => product?.type !== 'gift',
          )) as productChangeObjectType[];
        const shipmentId = getFieldValue(['shipment']).id;
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
                ...(!shipmentId ? {} : { shipments: [{ shipmentId }] }),
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
