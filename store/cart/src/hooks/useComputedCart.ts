// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import useMapCartItem from './useMapCartItem';

// graphql typescript
import {
  computedCart as computedCartType,
  computedCartVariables as computedCartVariablesType,
  computedCart_computedCart_ComputedCart as computedCartComputedCartComputedCartType,
  computedCart_computedCart_ComputedCart_computedLineItems as computedCartComputedCartComputedCartComputedLineItemsType,
  useComputedCartFragment as useComputedCartFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computedCart } from '../gqls/useComputedCart';

// typescript definition
interface ComputedProductsType
  extends computedCartComputedCartComputedCartType {
  computedLineItems: computedCartComputedCartComputedCartComputedLineItemsType[];
}

// definition
export default (
  // FIXME: using useCart and useCartFragment in T9918
  _viewer: useComputedCartFragmentType | null,
): ComputedProductsType | null => {
  const mapCartItem = useMapCartItem();
  const cartItems = mapCartItem?.cartItems || null;
  const cartProducts = mapCartItem?.cartProducts || null;
  const { data } = useQuery<computedCartType, computedCartVariablesType>(
    computedCart,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        cartItems: cartItems || [],
        cartProducts: cartProducts || [],
      },
      skip: !cartItems || !cartProducts,
    },
  );

  return useMemo(() => {
    if (!data || data.computedCart.__typename !== 'ComputedCart') return null;

    return {
      ...data.computedCart,
      computedLineItems: (data.computedCart?.computedLineItems?.filter(
        Boolean,
      ) || []) as computedCartComputedCartComputedCartComputedLineItemsType[],
    };
  }, [data]);
};
