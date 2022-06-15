// typescript import
import { FormInstance } from 'antd/lib/form';
import { ModalFunc } from 'antd/lib/modal/confirm';

import { ValuesType } from './useInitialValues';

// import
import { useCallback, useState, useEffect, useContext, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import {
  computeOrderList as computeOrderListType,
  computeOrderListVariables as computeOrderListVariablesType,
  computeOrderList_computeOrderList as computeOrderListComputeOrderListType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computeOrderList as computeOrderListQuery } from '../gqls/useComputeOrderList';

// typescript definition
export type ComputeOrderList = (value?: {
  paymentId?: string;
  coupon?: string;
  points?: number;
}) => void;

// definition
export default (
  { getFieldValue }: FormInstance,
  initialValues: ValuesType,
): {
  computeOrderListLoading: boolean;
  computeOrderListData: computeOrderListComputeOrderListType | null;
  computeOrderList: ComputeOrderList;
} => {
  const { t, ready } = useTranslation('checkout');
  const getLanguage = useGetLanguage();
  const { push } = useRouter();
  const adTrack = useContext(AdTrackContext);
  const [isAdTracked, setIsAdTracked] = useState(false);
  const modalRef = useRef<ReturnType<ModalFunc>>();
  const [mutation, { loading, data }] = useMutation<
    computeOrderListType,
    computeOrderListVariablesType
  >(computeOrderListQuery);
  const { products, shipment } = initialValues;
  const computeOrderList: ComputeOrderList = useCallback(
    value => {
      if (!shipment?.id || !products) return;

      const paymentId = value?.paymentId || getFieldValue(['paymentId']);
      const coupon = value?.coupon || getFieldValue(['coupon']);
      const points = value?.points || getFieldValue(['points']);

      mutation({
        variables: {
          computeOrderList: [
            {
              computeType: 'cart',
              products,
              shipments: [{ shipmentId: shipment.id }],
              ...(!paymentId ? {} : { payments: [{ paymentId }] }),
              ...(!coupon ? {} : { coupon }),
              ...(!points ? {} : { points }),
            },
          ],
        },
      });
    },
    [shipment, products, getFieldValue, mutation],
  );
  const computeOrderListData = data?.computeOrderList?.[0] || null;
  const computedProducts = computeOrderListData?.categories?.[0]?.products;

  useEffect(() => {
    computeOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalRef.current || !ready) return;

    if (!products?.length) {
      modalRef.current = Modal.warning({
        title: t('cart-is-empty'),
        okText: t('confirm-go-to'),
        onOk: () => push('/'),
      });
      return;
    }

    if (!shipment) {
      modalRef.current = Modal.warning({
        title: t('shipment-empty'),
        content: t('choose-shipment'),
        okText: t('go-back-to-cart'),
        onOk: () => push('/cart'),
      });
    }
  }, [products, push, shipment, t, ready]);

  useEffect(() => {
    if (!computedProducts) return;

    if (
      !modalRef.current &&
      computedProducts.some(
        product => product?.type !== 'gift' && product?.error,
      )
    ) {
      modalRef.current = Modal.warning({
        title: t('products-error'),
        content: t('choose-products'),
        okText: t('go-back-to-cart'),
        onOk: () => push('/cart'),
      });
    }

    if (!isAdTracked && computeOrderListData?.priceInfo?.total) {
      setIsAdTracked(true);

      adTrack.beginCheckout({
        products: computedProducts.map(product => ({
          id: product?.productId || '',
          type: product?.type || '',
          title: !product?.title
            ? null
            : {
                ...product?.title,
                // eslint-disable-next-line @typescript-eslint/camelcase
                zh_TW: getLanguage(product?.title),
              },
          specs: (product?.specs || []).map(spec => ({
            title: !spec?.title
              ? null
              : {
                  ...spec.title,
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  zh_TW: getLanguage(spec?.title),
                },
          })),
          totalPrice: product?.retailPrice || 0,
          quantity: product?.quantity || 0,
        })),
        total: computeOrderListData.priceInfo.total,
      });
    }
  }, [
    computedProducts,
    t,
    push,
    isAdTracked,
    computeOrderListData,
    adTrack,
    getLanguage,
  ]);

  return {
    computeOrderListLoading: loading,
    computeOrderListData,
    computeOrderList,
  };
};
