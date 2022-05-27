// typescript import
import { QueryResult } from '@apollo/client';
import { FormInstance } from 'antd/lib/form';

import { ValuesType } from './useInitialValue';

// import
import { useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';

import { useCart } from '@meepshop/hooks';
import filter from '@meepshop/utils/lib/filter';

// graphql typescript
import {
  computedCart as computedCartType,
  computedCartVariables as computedCartVariablesType,
  computedCart_computedCart_ComputedCart as computedCartComputedCartComputedCartType,
  useComputedCartFragment as useComputedCartFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { computedCart } from '../gqls/useComputedCart';

// typescript definition
export interface ReturnType
  extends Pick<
    QueryResult<computedCartType, computedCartVariablesType>,
    'refetch' | 'variables'
  > {
  loading: boolean;
  computedCart: computedCartComputedCartComputedCartType | null;
}

interface PropsType {
  form: FormInstance;
  viewer: useComputedCartFragmentType | null;
  initialValue: ValuesType;
}

// definition
export default ({
  form: { getFieldValue, setFieldsValue },
  viewer,
  initialValue,
}: PropsType): ReturnType => {
  const itialized = useRef(false);
  const products: ValuesType['products'] = getFieldValue(['products']);
  const shipmentId: ValuesType['shipmentId'] = getFieldValue(['shipmentId']);
  const { loading, cartItems } = useCart(filter(useCartFragment, viewer));
  const computedCartItemInput = useMemo(
    () =>
      cartItems.map(({ __typename: _, ...cartItem }) =>
        !itialized.current && !initialValue.products.length
          ? { ...cartItem, isSelectedForCompute: true }
          : {
              ...cartItem,
              isSelectedForCompute: products?.some(product => {
                const isChecked = product.variantId === cartItem.variantId;

                if (!shipmentId) return isChecked;

                return (
                  isChecked &&
                  product?.applicableShipments?.find(
                    shipment => shipment.id === shipmentId,
                  )
                );
              }),
            },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, initialValue.products.length, products],
  );
  const { data, refetch, variables, loading: computedCartLoading } = useQuery<
    computedCartType,
    computedCartVariablesType
  >(computedCart, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        cartItems: computedCartItemInput,
        shipmentId,
      },
    },
    skip: loading,
    onCompleted: newData => {
      if (newData.computedCart.__typename !== 'ComputedCart') return;

      const { computedLineItems } = newData.computedCart;
      const hasDesignatedShipment = computedLineItems.some(
        ({ type, requireDesignatedShipment }) =>
          type !== 'GIFT' && requireDesignatedShipment,
      );

      setFieldsValue({
        products: hasDesignatedShipment
          ? products.map(product => ({
              ...product,
              ...computedLineItems.find(
                item => item.variantId === product.variantId,
              ),
            }))
          : computedLineItems.filter(item => item.type !== 'GIFT'),
      });
    },
  });

  useEffect(() => {
    if (
      !itialized.current &&
      !initialValue.products.length &&
      data?.computedCart.__typename === 'ComputedCart'
    ) {
      setFieldsValue({
        products: data.computedCart.computedLineItems.filter(
          item => item.type !== 'GIFT',
        ),
      });
      itialized.current = true;
    }
  }, [data, initialValue, setFieldsValue]);

  return {
    loading: computedCartLoading || loading,
    computedCart: useMemo(() => {
      if (data?.computedCart.__typename !== 'ComputedCart') return null;

      return data.computedCart;
    }, [data]),
    refetch,
    variables,
  };
};
