// typescript import
import { MutationFunction } from '@apollo/client';
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form';

// import
import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import usePayments from './usePayments';
import useShipments from './useShipments';

// graphql typescript
import {
  computeOrderInLandingPage as computeOrderInLandingPageType,
  computeOrderInLandingPage_computeOrderList as computeOrderInLandingPageComputeOrderList,
  computeOrderInLandingPageVariables,
  usePaymentsLandingPageModuleFragment_storePayments as usePaymentsLandingPageModuleFragmentStorePayments,
  useShipmentsLandingPageModuleFragment_storeShipments as useShipmentsLandingPageModuleFragmentStoreShipments,
  usePaymentsOrderFragment_categories_paymentList as PaymentType,
  useShipmentsOrderFragment_categories_shipmentList as ShipmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { computeOrderInLandingPage } from '../gqls/useComputeOrder';

// graphql definition
export interface UseComputeOrderType {
  computeOrder: (
    coupon?: string,
  ) => ReturnType<
    MutationFunction<
      computeOrderInLandingPageType,
      computeOrderInLandingPageVariables
    >
  >;
  order: computeOrderInLandingPageComputeOrderList | null;
  payment: PaymentType | null;
  payments: PaymentType[];
  shipment: ShipmentType | null;
  shipments: ShipmentType[];
}

// definition
export default (
  form: FormComponentProps['form'],
  storePayments: usePaymentsLandingPageModuleFragmentStorePayments[],
  storeShipments: useShipmentsLandingPageModuleFragmentStoreShipments[],
  productId: string | null | undefined,
  isQuantityRequired: boolean,
): UseComputeOrderType => {
  const [mutation, { data }] = useMutation<
    computeOrderInLandingPageType,
    computeOrderInLandingPageVariables
  >(computeOrderInLandingPage);
  const [payment, payments] = usePayments(
    data?.computeOrderList?.[0]?.categories?.[0]?.paymentList || null,
    storePayments,
    form,
  );
  const [shipment, shipments] = useShipments(
    data?.computeOrderList?.[0]?.categories?.[0]?.shipmentList || null,
    storeShipments,
    form,
  );

  const { getFieldValue, getFieldsValue } = form;
  const { variantId, quantity, paymentId, shipmentId } = getFieldsValue([
    'variantId',
    'quantity',
    'paymentId',
    'shipmentId',
  ]);

  const computeOrder = useCallback(
    (coupon?: string) =>
      mutation({
        variables: {
          computeOrderList: [
            {
              computeType: 'cart',
              payments: [{ paymentId }],
              shipments: [{ shipmentId }],
              coupon: coupon || getFieldValue('coupon'),
              products: [
                {
                  productId,
                  variantId: variantId?.slice(-1)[0],
                  quantity: isQuantityRequired ? quantity ?? 1 : 1,
                },
              ],
            },
          ],
        },
      }),
    [
      mutation,
      getFieldValue,
      variantId,
      quantity,
      paymentId,
      shipmentId,
      productId,
      isQuantityRequired,
    ],
  );

  useEffect(() => {
    computeOrder();
  }, [computeOrder]);

  return {
    computeOrder,
    order: data?.computeOrderList?.[0] || null,
    payment,
    payments,
    shipment,
    shipments,
  };
};
